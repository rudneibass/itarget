<?php

namespace App\AppModules\Form\Infra\Controllers\Form;

use App\AppModules\Form\Domain\UseCases\Form\ListForm\ListForm;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Form\Infra\Controllers\BaseController;


use Illuminate\Http\Request;

class ListFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListForm(new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
