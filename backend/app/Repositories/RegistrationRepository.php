<?php

declare(strict_types=1);

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use App\Models\Registration;
use Illuminate\Pagination\LengthAwarePaginator;

class RegistrationRepository  extends AbstractRepository {
    
    public function __construct() {
        parent::__construct(new Registration);
    }

    public function findByEMail(string $email): ?array{
        return $this->model::where(["email" => $email])->get()->toArray();
    }

    public function findByEMailAndEventId(string $email, string $eventId): ?array {
        return $this->model
        ::where('email', $email)
        ->where('event_id', $eventId)
        ->get()->toArray();
    }
    
    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'registrations' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name = {$params['name']}" : "" )
            .(isset($params['email']) && !empty($params['email']) ? " AND email = {$params['email']}" : "" )
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
}