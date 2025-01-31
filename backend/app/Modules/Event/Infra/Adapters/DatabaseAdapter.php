<?php

namespace App\Modules\Event\Infra\Adapters;

use App\Modules\Event\Domain\Interfaces\Database;
use Illuminate\Support\Facades\DB;

class DatabaseAdapter implements Database
{
    public function rawQuery(string $query, array $bindings = []): array
    {
        return array_map(function($item){
            return (array) $item;
        }, DB::select($query, $bindings));
    }
}
