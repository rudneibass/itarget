<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class PaginateRegistrationController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new PaginateRegistration(new RegistrationRepository);
            return $useCase->execute();
        });
    }
}
