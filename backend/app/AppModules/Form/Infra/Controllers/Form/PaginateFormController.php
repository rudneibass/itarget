<?php

namespace App\AppModules\Form\Infra\Controllers\Form;

use App\AppModules\Form\Domain\UseCases\Form\PaginateForm\PaginateForm;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class PaginateFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateForm(new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
