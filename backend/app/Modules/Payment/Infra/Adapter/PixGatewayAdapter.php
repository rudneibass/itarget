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

    public function generate(
        string $productId, 
        float $value, 
        string $description,
        string $clientId, 
        string $clientSecret): array
    {
        return 
        $this->service->generate(
            $productId, 
            $value, 
            $description,
            $clientId, 
            $clientSecret
        );
    }
    
    public function search(string $txId, string $clientId, string $clientSecret): array
    {
        return $this->service->searchPayment($txId, $clientId, $clientSecret);
    }
}
