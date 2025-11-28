<?php

namespace App\Modules\Payment\Domain\Interfaces;

interface Database
{
    public function beginTransaction(): void;
    public function commit(): void;
    public function rollback(): void;
    public function rawQuery(string $query, array $bindings = []): array;
}