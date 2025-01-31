<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Domain\UseCases\Registration\UpdateRegistration\UpdateRegistration;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Http\Request;

class UpdateRegistrationController {
    
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
