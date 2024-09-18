<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit\GetRegistrationFormEdit;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class GetRegistrationFormEditController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id) {
            $useCase = new GetRegistrationFormEdit(new RegistrationRepository); 
            return $useCase->execute($id);
        });
    }
}
