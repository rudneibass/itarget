<?php

namespace App\Modules\Form\Domain\Interfaces;

interface Database
{
    public function rawQuery(string $query, array $bindings = []): array;
}