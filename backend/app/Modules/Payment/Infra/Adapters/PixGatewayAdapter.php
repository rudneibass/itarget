<?php
namespace App\Modules\Payment\Infra\Adapters;

use App\Modules\Payment\Domain\Interfaces\PixGateway;


class PixGatewayAdapter implements PixGateway
{
    
    private $service;
    private array $availableServices = [
        'itau' => \App\Modules\Shared\Services\External\Itau\ItauPix::class,
        'bradesco' => \App\Modules\Shared\Services\External\Bradesco\PixBradesco::class,
    ];
    
    public function __construct(private string $paymentGateway){
        $this->service = new $this->availableServices[$paymentGateway]();
    }

    public function setCredentials(array $credentials): void{
        $this->service->setCredentials($credentials);
    }
 
    public function generate(array $pix): array {
        return $this->service->create($pix);
    }
    
    public function search(array $pix): array {
        return $this->service->capture($pix);
    }
}
