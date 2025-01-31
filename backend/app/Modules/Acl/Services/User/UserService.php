<?php 

namespace App\Modules\Acl\Services\User;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Modules\Acl\Base\BaseService;
use App\Modules\Acl\Daos\User\UserDao;
use App\Modules\Acl\Daos\Form\FormDao;

class UserService extends BaseService
{
    public function __construct(){
        $this->dao = new UserDao;
        $this->formDao = new FormDao;
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
