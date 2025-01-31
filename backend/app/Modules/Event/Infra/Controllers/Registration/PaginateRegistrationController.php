<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Infra\Controllers\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class PaginateRegistrationController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateRegistration(new RegistrationRepository);
            return $useCase->execute($request->all());
        });
    }
}
