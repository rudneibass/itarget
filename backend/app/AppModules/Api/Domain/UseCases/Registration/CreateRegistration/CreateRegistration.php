<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\CreateRegistration;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationDTO;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;

class CreateRegistration {
    private $registrationRepository;

    public function __construct(RegistrationRepositoryInterface $registrationRepository){
        $this->registrationRepository = $registrationRepository;
    }

    public function execute(RegistrationDTO $dto): ?array {
        return $this->registrationRepository->create(new Registration($dto))->toArray();
    }
}