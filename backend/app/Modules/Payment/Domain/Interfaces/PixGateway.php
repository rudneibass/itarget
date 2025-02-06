<?php
namespace App\Modules\Payment\Domain\Interfaces;

interface PixGateway
{
    public function setCredentials(array $credentials): void;
    public function generate(float $value, string $description, string $productId): array;
    public function search(string $transactionId): array;
}
