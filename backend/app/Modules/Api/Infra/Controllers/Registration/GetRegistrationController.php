<?php

namespace App\Modules\Api\Infra\Controllers\Registration;


use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\Modules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

class GetRegistrationController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetRegistration(new RegistrationRepositorY);
            return $useCase->execute($id);
        });
    }
}
