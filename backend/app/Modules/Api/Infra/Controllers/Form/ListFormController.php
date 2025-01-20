<?php

namespace App\Modules\Api\Infra\Controllers\Form;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\Modules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;

use Illuminate\Http\Request;

class ListFormController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListRegistration(new RegistrationRepository);
            return $useCase->execute($request->all());
        });
    }
}
