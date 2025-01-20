<?php

namespace App\Modules\Event\Domain\UseCases\Registration\CreateRegistration;

use App\Modules\Event\Domain\Entities\Registration\Registration;
use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use App\Modules\Event\Domain\Entities\Registration\RegistrationRepository;

class CreateRegistration {
    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(RegistrationDto $dto): ?array {
        return $this->repository->create(new Registration($dto))->toArray();
    }
}