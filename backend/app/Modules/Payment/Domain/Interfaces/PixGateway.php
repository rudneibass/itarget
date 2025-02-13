<?php
namespace App\Modules\Payment\Domain\Interfaces;

interface PixGateway
{
    public function setGateway(string $gateway): void;
    public function setCredentials(array $credentials): void;
    public function generate(array $pix): array;
    public function search(array $pix): array;
}
