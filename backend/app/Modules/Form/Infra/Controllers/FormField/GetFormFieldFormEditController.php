<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class GetFormFieldFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormFieldFormEdit(
                new FormFieldRepository,
                new FormRepository, 
                new RepositoryFactory
            );
            return $useCase->execute($request->all());
        });
    }
}
