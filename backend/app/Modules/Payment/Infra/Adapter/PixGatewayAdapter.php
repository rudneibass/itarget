<?php
namespace App\Modules\Payment\Infra\Adapters;

use App\Modules\Payment\Domain\Interfaces\PixGateway;


class PixGatewayAdapter implements PixGateway
{
    
    private $service;
    private array $availableServices = [
        'itau' => \App\Modules\Shared\Services\External\Itau\ItauPix::class,
        'bradesco' => \App\Modules\Shared\Services\External\Bradesco\BradescoPix::class,
    ];
    
    public function __construct(
        private string $paymentGateway
    ){
        $this->service = new $this->availableServices[$paymentGateway]();
    }

    public function generate(
        string $productId, 
        float $valor, 
        string $descricao,
        string $baseUrl, 
        string $clientId, 
        string $clientSecret): array
    {
        $token = $this->authenticate($baseUrl, $clientId, $clientSecret);
        return $this->service->generate($productId, $valor, $descricao, $token);
    }
    
    private function authenticate(string $baseUrl, string $clientId, string $clientSecret): string
    {
        return $this->service->authenticate($baseUrl, $clientId, $clientSecret);
    }

    public function checkPayment(string $txId, string $baseUrl, string $clientId, string $clientSecret): array
    {
        $token = $this->authenticate($baseUrl, $clientId, $clientSecret);
        return $this->service->generate($txId, $token);
    }
}
