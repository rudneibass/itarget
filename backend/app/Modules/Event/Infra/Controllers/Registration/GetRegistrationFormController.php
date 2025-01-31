<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Infra\Base\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\Modules\Event\Infra\Adapters\FormServiceAdapter;
use App\Modules\Services\Form\FormService;
use Illuminate\Http\Request;

class GetRegistrationFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new GetRegistrationForm(new FormServiceAdapter(new FormService));
            return $useCase->execute($request->all());
        });
    }
}
