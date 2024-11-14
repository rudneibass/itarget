<?php

namespace App\AppModules\Form\Infra\Controllers\FormField;

use App\AppModules\Form\Domain\UseCases\FormField\GetFormFieldForm\GetFormFieldForm;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;

class GetFormFieldFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetFormFieldForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
