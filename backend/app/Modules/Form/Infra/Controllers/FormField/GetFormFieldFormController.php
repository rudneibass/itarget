<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\UseCases\FormField\GetFormFieldForm\GetFormFieldForm;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;

class GetFormFieldFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetFormFieldForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
