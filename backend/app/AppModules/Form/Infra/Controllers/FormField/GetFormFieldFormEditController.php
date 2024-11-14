<?php

namespace App\AppModules\Form\Infra\Controllers\FormField;

use App\AppModules\Form\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\Factory\RepositoryFactory;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
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
