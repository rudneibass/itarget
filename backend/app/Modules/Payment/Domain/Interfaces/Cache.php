<?php
namespace App\Modules\Payment\Domain\Interfaces;

interface Cache
{
    public function get(string $key);
    public function has(string $key): bool;
    public function forget(string $key): void;
    public function put(string $key, mixed $value, int $minutes): void;
}