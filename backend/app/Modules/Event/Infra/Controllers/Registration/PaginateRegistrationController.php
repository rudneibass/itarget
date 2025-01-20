<?php

namespace App\Modules\Api\Infra\Controllers\Registration;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\Modules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class PaginateRegistrationController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateRegistration(new RegistrationRepository);
            return $useCase->execute($request->all());
        });
    }
}
