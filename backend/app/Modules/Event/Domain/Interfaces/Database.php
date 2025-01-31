<?php

namespace App\Modules\Event\Domain\Interfaces;

interface Database
{
    public function rawQuery(string $query, array $bindings = []): array;
}