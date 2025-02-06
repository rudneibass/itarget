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

    public function execute(array $request)
    {
        $pix = new Pix(new PixDto($request));

        $cacheKey = "qr_code_pix_product_id_{$pix->productId}_user_id_{$pix->useId}";
        
        if ($this->cacheAdapter->has($cacheKey)) { 
            return $this->cacheAdapter->get($cacheKey); 
        }

        if ($this->repository->findAllByParams(['product_id' => $pix->productId, 'user_id' => $pix->userId, 'status' => Pix::PAID])[0]) {
            return ['message' => 'Já existe um pagamento efetuado via pix associado ao produto_id '.$pix->productId];
        }

        if ($pixFoundOnRepository = $this->repository->findAllByParams(['product_id' => $pix->productId, 'user_id' => $pix->userId, 'status' => Pix::PENDING])[0]) {
            if($pixFoundOnGateway = $this->pixGatewayAdapter->search(['valor' => $pix->value, 'pessoa_cpf' => '', 'pessoa_nome' => ''])){
                $pixFoundOnRepository->status = $pixFoundOnGateway['data']['status'];
                $this->repository->update($pixFoundOnRepository);
            }
        }
        
        # Verifique a doc do serviço instanciado para saber quais são as informações nescessárias 
        # para o parameto dos mátodos 
        # setCredentials(array $credentials): void e
        # generate(array $pix): array;
        $this->pixGatewayAdapter->setCredentials(['client' => '', 'secret' => '', 'key_pix' => '', 'number' => '']);
        
        $newPix = $this->pixGatewayAdapter->generate(['valor' => $pix->value, 'pessoa_cpf' => '', 'pessoa_nome' => '']);

        $this->repository
        ->create(
            new Pix(
                new PixDto([
                    'product_id' => $pix->productId, 
                    'user_id' => $pix->userId,
                    'status' => Pix::PENDING, 
                    'qr_code' => $newPix['data']['qr_code'], 
                    'tx_id' => $newPix['data']['txid'], 
                    'api_response' => $newPix['data']
                ])
        ));

        $this->cacheAdapter->put(
            $key = $cacheKey, 
            $value = ['qr_code' => $newPix['data']['qr_code']], 
            $minutes = 5
        );

        return $newPix;
    }
}
