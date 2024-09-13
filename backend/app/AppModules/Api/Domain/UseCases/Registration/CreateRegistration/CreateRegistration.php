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

    public function execute(RegistrationDTO $dto): bool{
   
        $registration = new Registration($dto);

        $this->registrationRepository->create($registration);

        return true;
    }
}