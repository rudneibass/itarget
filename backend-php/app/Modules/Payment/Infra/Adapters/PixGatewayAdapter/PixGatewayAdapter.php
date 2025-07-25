<?php
namespace App\Modules\Payment\Infra\Adapters\PixGatewayAdapter;

use App\Modules\Payment\Domain\Interfaces\PixGateway;


class PixGatewayAdapter implements PixGateway
{
    
    private $gateway;
    private array $availableGateways = [
        'itau' => \App\Modules\Integrations\Services\External\Itau\ItauPix::class,
        'bradesco' => \App\Modules\Integrations\Services\External\Bradesco\PixBradesco::class,
    ];
    
    public function setGateway(string $gateway): void{
        $this->gateway = new $this->availableGateways[$gateway]();
    }

    public function setCredentials(array $credentials): void{
        $this->gateway->setCredentials($credentials);
    }
 
    public function generate(array $pix): array {
        return $this->gateway->create($pix);
    }
    
    public function search(array $pix): array {
        return $this->gateway->capture($pix);
    }
}
