<?php 

namespace App\AppModules\Acl\Services\User;

use Illuminate\Pagination\LengthAwarePaginator;
use App\AppModules\Acl\Services\BaseService;
use App\AppModules\Acl\Daos\User\UserDao;

class UserService extends BaseService
{
    public function __construct(){
        $this->dao = new UserDao;
    }

    public function findAllByParams(array $params){
        return $this->dao->findAllByParams($params);
    }

    public function search(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->dao->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
        $result = $this->dao->findAllByParams($params);

        return 
        new LengthAwarePaginator($result,$total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}
