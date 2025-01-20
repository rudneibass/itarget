<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Infra\Controllers\BaseController;
use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
use App\Modules\Event\Domain\UseCases\Registration\CreateRegistration\CreateRegistration;

use Illuminate\Http\Request;

class CreateRegistrationController extends BaseController {
    
    protected $createRequest;

    public function index(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new CreateRegistration(new RegistrationRepository);
            return $useCase->execute(new RegistrationDto($request->all()));
        });
    }
}
