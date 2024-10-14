<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Domain\UseCases\FormField\GetFormFieldForm\GetFormFieldForm;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormFieldFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetFormFieldForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
