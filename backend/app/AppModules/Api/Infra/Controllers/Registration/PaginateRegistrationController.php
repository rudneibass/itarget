<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class PaginateRegistrationController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $repository = new RegistrationRepository();
            $useCase = new  PaginateRegistration($repository);
            return $useCase->execute();
        });
    }
}
