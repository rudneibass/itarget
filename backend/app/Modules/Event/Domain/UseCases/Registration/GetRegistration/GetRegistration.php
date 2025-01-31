<?php

namespace App\Modules\Event\Domain\UseCases\Registration\GetRegistration;

use App\Modules\Event\Domain\Interfaces\Database;
use App\Modules\Event\Domain\Interfaces\Model;
use App\Modules\Event\Domain\Repositories\Registration\Database\RegistrationRepository;

class GetRegistration {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new RegistrationRepository ($modelAdapter, $databaseAdapter);
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