<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\ListRegistration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepository;

class ListRegistration {
    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(array $params = []): array {
        return array_map(function($registration){
            return [
                'name' => $registration->name,
                'display_name' => $registration->displayName,
                'email' => $registration->email,
                'cpf' => $registration->cpf,
                'id' => $registration->id,
                'event_id' => $registration->eventId,
                'registration_id' => $registration->registrationId,
                'published' => $registration->published
            ];
        }, $this->repository->findAllByParams($params));
    }
}