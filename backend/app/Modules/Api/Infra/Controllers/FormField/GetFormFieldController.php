<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\FormField\GetFormField\GetFormField;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;

class GetFormFieldController extends BaseController {
    public function index(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetFormField(new FormFieldRepository);
            return $useCase->execute($id);
        });
    }
}
