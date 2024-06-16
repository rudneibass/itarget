<?php

declare(strict_types=1);
namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use App\Models\Event;

class EventRepository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new Event);
    }

    public function findByEMail(string $email): ?array{
        return $this->model::where(["email" => $email])->get()->toArray();
    }

    public function findByIds(array $ids): ?array {
        return $this->model::whereIn('id', $ids)->get()->toArray();
    }

    public function findByParams(array $params = []): array {
        $query = "SELECT * 
            FROM 'events' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND events.id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND events.name = {$params['name']}" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limir']) ? " LIMIT {$params['limit']}" : "" );

        return DB::select($query);
    }
}