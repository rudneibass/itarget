<?php
namespace App\Modules\Payment\Domain\Interfaces;

interface PixGateway
{
    public function generate(string $contaReceberId, float $valor, string $descricao, string $clientId, string $clientSecret): array;
    public function search(string $txId, string $clientId, string $clientSecret): array;
}
