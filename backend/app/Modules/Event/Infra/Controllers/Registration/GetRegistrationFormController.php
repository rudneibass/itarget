<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\Modules\Event\Infra\Controllers\BaseController;
use App\Modules\Event\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetRegistrationForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
