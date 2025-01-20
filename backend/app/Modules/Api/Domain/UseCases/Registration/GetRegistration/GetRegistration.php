<?php

namespace App\Modules\Api\Domain\UseCases\Registration\GetRegistration;

use App\Modules\Api\Domain\Entities\Registration\RegistrationRepository;

class GetRegistration {
    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(string $id): array {
        $registration = $this->repository->get($id);
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