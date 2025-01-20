<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Domain\UseCases\FormField\GetFormFieldForm\GetFormFieldForm;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormFieldFormController extends BaseController {
    public function index() {
        return $this->executeAction(function() {
            $useCase = new GetFormFieldForm(new FormRepository); 
            return $useCase->execute();
        });
    }
}
