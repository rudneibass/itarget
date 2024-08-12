<?php

namespace App\Repositories\Api;

use App\Models\FormField;
use Illuminate\Support\Facades\DB;

class FormFieldRepository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new FormField);
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND form_id = {$params['form_id']}" : "" )
            .(isset($params['is_active']) && !empty($params['is_active']) ? " AND is_active = {$params['is_active']}" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY '{$params['order']}'" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return DB::select($query);
    }
}