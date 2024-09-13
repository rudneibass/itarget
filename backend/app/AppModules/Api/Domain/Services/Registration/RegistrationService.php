<?php 

namespace App\AppModules\Api\Domain\Services\Registration;

use App\AppModules\Api\Domain\Services\Service;
use App\AppModules\Api\Infra\Repositories\FormFieldRepository;
use App\AppModules\Api\Infra\Repositories\FormRepository;
use App\AppModules\Api\Infra\Repositories\RegistrationRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class RegistrationService extends Service
{
    protected $repository;
    
    public function __construct(){
        $this->repository = new  RegistrationRepository;
        $this->formRepository = new FormRepository;
        $this->fieldRepository = new FormFieldRepository;
    }

    public function findAllByParams(array $params){
        return $this->repository->findAllByParams($params);
    }

    public function search(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
        $result = $this->repository->findAllByParams($params);

        return 
        new LengthAwarePaginator($result,$total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
    
}
