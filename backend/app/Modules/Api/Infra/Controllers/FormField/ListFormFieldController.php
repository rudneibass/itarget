<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Domain\UseCases\FormField\ListFormField\ListFormField;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class ListFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
