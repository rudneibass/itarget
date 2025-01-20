<?php

namespace App\Modules\Api\Infra\Controllers\Registration;

use App\Modules\Api\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetRegistrationForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
