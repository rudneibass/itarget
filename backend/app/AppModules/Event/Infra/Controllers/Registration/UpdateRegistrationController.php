<?php

namespace App\AppModules\Api\Infra\Controllers\Registration;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\Registration\UpdateRegistration\UpdateRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class UpdateRegistrationController extends BaseController {
    
    protected $updateRequest;

    public function index(Request $request, $id) {
       
        return $this->executeAction(function() use ($request, $id) {
     
            if(isset($this->updateRequest)){
                $this->updateRequest->merge($request->all());
                $this->updateRequest->validate($this->updateRequest->rules());
            }
            
            $useCase = new UpdateRegistration(new RegistrationRepository);
            return $useCase->execute($request->all(), $id);
        });
    }
}
