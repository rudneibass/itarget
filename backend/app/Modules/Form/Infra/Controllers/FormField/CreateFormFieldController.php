<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\Entities\FormField\FormFieldDto;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Domain\UseCases\FormField\CreateFormField\CreateFormField;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
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
