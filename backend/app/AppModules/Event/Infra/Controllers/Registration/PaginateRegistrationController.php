<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class PaginateRegistrationController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateRegistration(new RegistrationRepository);
            return $useCase->execute($request->all());
        });
    }
}
