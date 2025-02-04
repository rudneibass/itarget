<?php
namespace App\Modules\Payment\Domain\Interfaces;

interface PixGateway
{
    public function generate(string $contaReceberId, float $valor, string $descricao, string $baseUrl, string $clientId, string $clientSecret): array;
    public function checkPayment(string $txId, string $baseUrl, string $clientId, string $clientSecret): array;
}
