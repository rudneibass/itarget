<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\ListRegistration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;

class ListRegistration {
    private $registrationRepository;

    public function __construct(RegistrationRepositoryInterface $registrationRepository){
        $this->registrationRepository = $registrationRepository;
    }

    public function execute(): array {

        $registrations = $this->registrationRepository->list();
        $list = [];

        foreach ($registrations as $item) {
            $registration = [];
            $registration['name'] = $item->name;
            $registration['email'] = $item->email;
            $registration['cpf'] = $item->cpf;
            $registration['id'] = $item->id;
            $registration['event_id'] = $item->eventId;
            
            $list[] = $registration;
        }

        return $list;
    }
}