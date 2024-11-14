<?php

namespace App\AppModules\Form\Infra\Controllers\FormField;

use App\AppModules\Form\Domain\Entities\FormField\FormFieldDto;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Domain\UseCases\FormField\CreateFormField\CreateFormField;
use App\AppModules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
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
