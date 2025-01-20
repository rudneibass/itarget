<?php

namespace App\Modules\Api\Infra\Controllers\Form;

use App\Modules\Api\Domain\UseCases\Form\PaginateForm\PaginateForm;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class PaginateFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateForm(new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
