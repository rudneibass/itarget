<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\FormField\CreateFormField\CreateFormField;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
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
