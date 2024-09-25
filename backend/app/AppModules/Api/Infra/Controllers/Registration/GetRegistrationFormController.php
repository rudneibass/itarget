<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetRegistrationForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
