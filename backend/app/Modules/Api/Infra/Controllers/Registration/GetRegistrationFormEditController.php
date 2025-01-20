<?php

namespace App\Modules\Api\Infra\Controllers\Registration;

use App\Modules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit\GetRegistrationFormEdit;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class GetRegistrationFormEditController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetRegistrationFormEdit(
                new RegistrationRepository, 
                new FormRepository, 
                new RepositoryFactory
            );
            return $useCase->execute($request->all());
        });
    }
}
