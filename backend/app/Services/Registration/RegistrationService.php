<?php 

namespace App\Services\Registration;

use App\Repositories\RegistrationRepository;
use App\Services\AbstractService;

class RegistrationService extends AbstractService
{
    protected $repository;
    
    public function __construct(){
        $this->repository = new  RegistrationRepository;
    }

    public function findByParams(array $registration){
        return $this->repository->findByParams($registration);
    }

    public function create(array $registration): array {

        $check_existing_registration_event = new CheckExistingRegistrationEvent($registration);
        if($check_existing_registration_event->invalid){
            return [
                'message' => $check_existing_registration_event->message,
                'registration' => $check_existing_registration_event->registration
            ];
        }

        $check_conflict_between_event_data = new CheckConflictBetweenEventData($registration);
        if($check_conflict_between_event_data->invalid){
            return [
                'message' => $check_conflict_between_event_data->message,
                'registration' => $check_conflict_between_event_data->registration
            ];
        }

        return [
            $this->repository->create($registration)
        ];
    }
}
