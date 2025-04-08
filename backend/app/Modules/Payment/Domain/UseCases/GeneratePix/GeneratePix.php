<?php
namespace App\Modules\Payment\UseCases\GeneratePix;

use App\Modules\Payment\Domain\Entities\Pix;
use App\Modules\Payment\Domain\Entities\PixDto;

use App\Modules\Payment\Domain\Repositories\Pix\Database\PixRepository;
use App\Modules\Payment\Domain\Interfaces\Cache;
use App\Modules\Payment\Domain\Interfaces\Database;
use App\Modules\Payment\Domain\Interfaces\Model;
use App\Modules\Payment\Domain\Interfaces\PixGateway;


class GeneratePix
{
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private Database $databaseAdapter,
        private Cache $cacheAdapter, 
        private PixGateway $pixGatewayAdapter) {
            $this->repository = new PixRepository($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(array $request) {
        $pix = new Pix(new PixDto($request));
        $this->checkCache($this->getCacheKey($pix));
        $this->checkPaidPix($pix);
        $this->checkPendingPix($pix);
        $newPix = $this->generatePix($pix);
        $this->storePix($pix, $newPix);
        $this->cachePix($this->getCacheKey($pix), $newPix);

        return $newPix;
    }

    private function getCacheKey(Pix $pix): string {
        return "qr_code_pix_product_id_{$pix->productId}_user_id_{$pix->userId}";
    }

    private function checkCache(string $cacheKey) {
        if ($this->cacheAdapter->has($cacheKey)) {
            return $this->cacheAdapter->get($cacheKey);
        }
    }

    private function checkPaidPix(Pix $pix) {
        $pixPaid = $this->repository->findAllByParams([
            'product_id' => $pix->productId,
            'user_id' => $pix->userId,
            'status' => Pix::PAID
        ]);

        if(!empty($pixPaid)){
            return ['message' => 'Já existe um pagamento efetuado via pix pelo user_id ' . $pix->userId . ' associado ao produto_id ' . $pix->productId];
        }
    }

    private function checkPendingPix(Pix $pix): void {
        $pixPending = $this->repository->findAllByParams([
            'product_id' => $pix->productId,
            'user_id' => $pix->userId,
            'status' => Pix::PENDING
        ]);

        if (!empty($pixPending)) {
            $pixPendingOnGateway = $this->pixGatewayAdapter->search([
                'valor' => $pix->value,
                'pessoa_cpf' => '',
                'pessoa_nome' => ''
            ]);

            if ($pixPendingOnGateway) {
                $pixPending[0]->status = $pixPendingOnGateway['data']['status'];
                $this->repository->update($pixPending[0]);
            }
        }
    }

    private function generatePix(Pix $pix): array {
        # Verifique a doc do serviço instanciado para saber quais são  
        # as informações nescessárias para os parametos dos mátodos 
        # setGateway(string $gateway): void;
        # setCredentials(array $credentials): void e
        # generate(array $pix): array;
        $this->pixGatewayAdapter->setGateway('itau');
        $this->pixGatewayAdapter->setCredentials([
            'client' => '',
            'secret' => '',
            'key_pix' => '',
            'number' => ''
        ]);

        return $this->pixGatewayAdapter->generate([
            'valor' => $pix->value,
            'pessoa_cpf' => '',
            'pessoa_nome' => ''
        ]);
    }

    private function storePix(Pix $pix, array $newPix): void {
        $this->repository->create(new Pix(new PixDto([
            'product_id' => $pix->productId,
            'user_id' => $pix->userId,
            'status' => Pix::PENDING,
            'qr_code' => $newPix['data']['qr_code'],
            'tx_id' => $newPix['data']['txid'],
            'api_response' => $newPix['data']
        ])));
    }

    private function cachePix(string $cacheKey, array $newPix): void {
        $this->cacheAdapter->put(
            $key = $cacheKey,
            $value = ['qr_code' => $newPix['data']['qr_code']],
            $minutes = 5
        );
    }
}
