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

        $newQrCode = 
        $this->pixGatewayAdapter
        ->generate(
            $pix->productId, 
            $pix->value, 
            $pix->description,
            '',
            '',
            ''
        );

        $newPix =
        $this->repository
        ->create(
            new Pix(
                new PixDto([
                    'product_id' => $pix->productId, 
                    'user_id' => $pix->userId,
                    'status' => Pix::PENDING, 
                    'qr_code' => $newQrCode['data']['qr_code'], 
                    'tx_id' => $newQrCode['data']['txid'], 
                    'api_response' => $newQrCode['data']
                ])
        ));

        $this->cacheAdapter->put(
            $key = $cacheKey, 
            $value = ['qr_code' => $newPix->qrCode], 
            $minutes = 5
        );

        return ['qr_code' => $newPix->qrCode];
    }
}
