<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Domain\UseCases\Form\GetFormEdit\GetFormEdit;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new FormRepository, new RepositoryFactory, new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
