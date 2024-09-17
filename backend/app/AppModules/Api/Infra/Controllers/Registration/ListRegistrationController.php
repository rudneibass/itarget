<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class ListRegistrationController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new ListRegistration(new RegistrationRepository);
            return $useCase->execute();
        });
    }
}
