<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\FormField\GetFormField\GetFormField;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;

class GetFormFieldController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetFormField(new FormFieldRepository);
            return $useCase->execute($id);
        });
    }
}
