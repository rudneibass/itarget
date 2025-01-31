<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Domain\UseCases\Registration\GetRegistrationFormEdit\GetRegistrationFormEdit;
use App\Modules\Event\Infra\Controllers\BaseController;
use App\Modules\Event\Infra\Repositories\Factory\RepositoryFactory;
use App\Modules\Event\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
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
