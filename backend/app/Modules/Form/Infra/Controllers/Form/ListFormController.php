<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Domain\UseCases\Form\ListForm\ListForm;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Infra\Controllers\BaseController;


use Illuminate\Http\Request;

class ListFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListForm(new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
