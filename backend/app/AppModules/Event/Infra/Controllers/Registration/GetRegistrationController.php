<?php

namespace App\AppModules\Event\Infra\Controllers\Registration;


use App\AppModules\Event\Infra\Controllers\BaseController;
use App\AppModules\Event\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\AppModules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;

class GetRegistrationController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetRegistration(new RegistrationRepositorY);
            return $useCase->execute($id);
        });
    }
}
