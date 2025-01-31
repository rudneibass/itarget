<?php

namespace App\Modules\Event\Domain\UseCases\Registration\CreateRegistration;

use App\Modules\Event\Domain\Entities\Registration\Registration;
use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use App\Modules\Event\Domain\Repositories\Registration\Database\RegistrationRepository;

use App\Modules\Event\Domain\Interfaces\Database;
use App\Modules\Event\Domain\Interfaces\Model;

class CreateRegistration {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new RegistrationRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(RegistrationDto $dto): ?array {
        return $this->repository->create(new Registration($dto))->toArray();
    }
}