<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
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
