<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit\GetRegistrationFormEdit;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Factory\RepositoryFactory;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
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
