<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;

class GetRegistration {
    private $registrationRepository;

    public function __construct(RegistrationRepositoryInterface $registrationRepository){
        $this->registrationRepository = $registrationRepository;
    }

    public function execute(string $id): array {
        $registration = $this->registrationRepository->get($id);
        return [
            'id' => $registration->id,
            'name' => $registration->name,
            'display_name' => $registration->displayName,
            'email' => $registration->email,
            'cpf' => $registration->cpf,
            'event_id' => $registration->eventId,
            'registration_id' => $registration->registrationId,
            'published' => $registration->published
        ];
    }
}