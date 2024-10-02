<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\ListRegistration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;

class ListRegistration {
    private $registrationRepository;

    public function __construct(RegistrationRepositoryInterface $registrationRepository){
        $this->registrationRepository = $registrationRepository;
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
        }, $this->registrationRepository->findAllByParams($params));
    }
}