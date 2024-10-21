<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\UpdateRegistration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepository;
use Exception;

class UpdateRegistration {
    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(array $requestData, $id): int {
        
        $registration = $this->repository->get($id);

        if (!$registration) { throw new Exception("Não foi possivel localizar inscrição com id ".$id.""); }

        $registration->name = $requestData['name'] ?? $registration->name;
        $registration->email = $requestData['email'] ?? $registration->email;
        $registration->cpf = $requestData['cpf'] ?? $registration->cpf;
        $registration->eventId = $requestData['event_id'] ?? $registration->eventId;
        $registration->registrationId = $requestData['registration_id'] ?? $registration->registrationId;

        return $this->repository->update($registration);
    }
}