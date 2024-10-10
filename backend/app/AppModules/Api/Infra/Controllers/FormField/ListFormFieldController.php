<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Domain\UseCases\FormField\ListFormField\ListFormField;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class ListFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
