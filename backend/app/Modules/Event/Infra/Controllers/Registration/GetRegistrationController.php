<?php

namespace App\Modules\Event\Infra\Controllers\Registration;


use App\Modules\Event\Infra\Controllers\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;

class GetRegistrationController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetRegistration(new RegistrationRepositorY);
            return $useCase->execute($id);
        });
    }
}
