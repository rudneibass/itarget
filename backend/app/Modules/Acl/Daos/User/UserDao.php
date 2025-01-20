<?php declare(strict_types=1);

namespace App\Modules\Acl\Daos\User;

use App\Modules\Acl\Daos\BaseDao;
use App\Modules\Acl\Models\User as UserModel;
use Illuminate\Support\Facades\DB;

class UserDao extends BaseDao {
    
    public function __construct() {
        parent::__construct(new UserModel);
    }

    public function findByEMail(string $email): ?array{
        return $this->model::where(["email" => $email])->get()->toArray();
    }
        
    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'user' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['email']) && !empty($params['email']) ? " AND email like '%{$params['email']}%'" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return DB::select($query);
    }
}