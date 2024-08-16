<?php 

namespace App\Services\Api\Registration;

use App\Repositories\Api\FormFieldRepository;
use App\Repositories\Api\FormRepository;
use App\Repositories\Api\RegistrationRepository;
use App\Services\Api\AbstractService;
use Illuminate\Pagination\LengthAwarePaginator;

use Exception;

class RegistrationService extends AbstractService
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

    public function create(array $registration): ?array {

        $rule_existing_registration_event = new RuleExistingRegistrationEvent($registration);
        if($rule_existing_registration_event->invalid){
            throw new Exception($rule_existing_registration_event->message);
        }

        $rule_conflict_between_event_data = new RuleConflictBetweenEventData($registration);
        if($rule_conflict_between_event_data->invalid){
            throw new Exception($rule_conflict_between_event_data->message);
        }

        return [
            $this->repository->create($registration)
        ];
    }
    
}
