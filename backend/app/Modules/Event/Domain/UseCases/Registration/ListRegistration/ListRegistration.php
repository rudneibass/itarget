<?php

namespace App\Modules\Event\Domain\UseCases\Registration\ListRegistration;

use App\Modules\Event\Domain\Interfaces\Database;
use App\Modules\Event\Domain\Interfaces\Model;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;

class ListRegistration {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new RegistrationRepository($modelAdapter, $databaseAdapter);
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