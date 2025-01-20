<?php

namespace App\Modules\Api\Infra\Controllers\Form;

use App\Modules\Api\Domain\UseCases\Form\GetFormEdit\GetFormEdit;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new FormRepository, new RepositoryFactory, new FormRepository);
            return $useCase->execute($request->all());
        });
    }
}
