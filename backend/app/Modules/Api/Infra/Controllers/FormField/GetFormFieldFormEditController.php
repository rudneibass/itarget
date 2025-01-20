<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
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
