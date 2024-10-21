<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\CreateRegistration;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationDto;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepository;

class CreateRegistration {
    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(RegistrationDto $dto): ?array {
        return $this->repository->create(new Registration($dto))->toArray();
    }
}