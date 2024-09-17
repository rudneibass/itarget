<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;


use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class GetRegistrationController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetRegistration(new RegistrationRepositorY);
            return $useCase->execute($id);
        });
    }
}
