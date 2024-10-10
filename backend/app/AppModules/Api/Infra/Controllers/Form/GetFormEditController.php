<?php

namespace App\AppModules\Api\Infra\Controllers\Form;

use App\AppModules\Api\Domain\UseCases\Form\GetFormEdit\GetFormEdit;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new FormRepository, new RepositoryFactory, new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
