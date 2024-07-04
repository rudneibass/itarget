<?php

declare(strict_types=1);
namespace App\Repositories\Api;

use Illuminate\Support\Facades\DB;
use App\Models\Event;
use Illuminate\Pagination\LengthAwarePaginator;

class EventRepository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new Event);
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'registrations' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name = {$params['name']}" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return DB::select($query);
    }

    public function search(array $params = []): ?LengthAwarePaginator {
        $result = $this->findAllByParams();
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($result);
        
        return 
        new LengthAwarePaginator($result, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }

    public function findByEMail(string $email): ?array{
        return $this->model::where(["email" => $email])->get()->toArray();
    }

    public function findByIds(array $ids): ?array {
        return $this->model::whereIn('id', $ids)->get()->toArray();
    }
}