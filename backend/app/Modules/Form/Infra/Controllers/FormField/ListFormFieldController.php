<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\UseCases\FormField\ListFormField\ListFormField;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class ListFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
