<?php
namespace App\Modules\Payment\Infra\Adapters;

use App\Modules\Payment\Domain\Interfaces\PixGateway;


class PixGatewayAdapter implements PixGateway
{
    
    private $gateway;
    private array $availableGateway = [
        'itau' => \App\Modules\Shared\Services\External\Itau\ItauPix::class,
        'bradesco' => \App\Modules\Shared\Services\External\Bradesco\PixBradesco::class,
    ];
    
    public function setGateway(string $gateway): void{
        $this->gateway = new $this->availableGateway[$gateway]();
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
