<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\UseCases\FormField\CreateFormField\CreateFormField;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class CreateFormFieldController extends BaseController {
    
    protected $createRequest;

    public function index(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new CreateFormField(new FormFieldRepository);
            return $useCase->execute(new FormFieldDto($request->all()));
        });
    }
}
