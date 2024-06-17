<?php 

namespace App\Services\Registration;

use App\Repositories\RegistrationRepository;
use App\Services\AbstractService;
use Exception;

class RegistrationService extends AbstractService
{
    protected $repository;
    
    public function __construct(){
        $this->repository = new  RegistrationRepository;
    }

    public function findAllByParams(array $params){
        return $this->repository->findAllByParams($params);
    }

    public function search(array $params){
        return $this->repository->search($params);
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
