<?php

namespace App\Modules\Payment\Domain\Interfaces;

interface Database
{
    public function rawQuery(string $query, array $bindings = []): array;
}