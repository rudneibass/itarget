<?php

namespace App\AppModules\Form\Infra\Controllers\FormField;

use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Domain\UseCases\FormField\GetFormField\GetFormField;
use App\AppModules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;

class GetFormFieldController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetFormField(new FormFieldRepository);
            return $useCase->execute($id);
        });
    }
}
