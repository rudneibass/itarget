<?php

namespace App\AppModules\Form\Infra\Controllers\Form;

use App\AppModules\Form\Domain\UseCases\Form\GetFormEdit\GetFormEdit;

use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\Factory\RepositoryFactory;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new FormRepository, new RepositoryFactory, new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
