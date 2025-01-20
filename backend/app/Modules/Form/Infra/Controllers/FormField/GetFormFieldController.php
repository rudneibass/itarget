<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Domain\UseCases\FormField\GetFormField\GetFormField;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;

class GetFormFieldController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetFormField(new FormFieldRepository);
            return $useCase->execute($id);
        });
    }
}
