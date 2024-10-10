<?php

namespace App\AppModules\Api\Infra\Controllers\Form;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

use Illuminate\Http\Request;

class ListFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListRegistration(new RegistrationRepository);
            return $useCase->execute($request->all());
        });
    }
}
