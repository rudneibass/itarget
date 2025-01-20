<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Domain\UseCases\FormField\PaginateFormField\PaginateFormField;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class PaginateFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
