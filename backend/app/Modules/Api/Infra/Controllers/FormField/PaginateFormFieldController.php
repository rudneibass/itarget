<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\FormField\PaginateFormField\PaginateFormField;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class PaginateFormFieldController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateFormField(new FormFieldRepository);
            return $useCase->execute($request->all());
        });
    }
}
