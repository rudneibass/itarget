<?php

namespace App\AppModules\Event\Infra\Controllers\Registration;

use App\AppModules\Event\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\AppModules\Event\Infra\Controllers\BaseController;

use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetRegistrationForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
