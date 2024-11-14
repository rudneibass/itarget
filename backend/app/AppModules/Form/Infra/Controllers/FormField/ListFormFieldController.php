<?php

namespace App\AppModules\Form\Infra\Controllers\FormField;

use App\AppModules\Form\Domain\UseCases\FormField\ListFormField\ListFormField;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class ListFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
