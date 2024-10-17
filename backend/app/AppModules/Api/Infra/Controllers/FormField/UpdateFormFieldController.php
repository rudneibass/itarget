<?php

namespace App\AppModules\Api\Infra\Controllers\FormField;

use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Domain\UseCases\FormField\UpdateFormField\UpdateFormField;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Http\Request;

class UpdateFormFieldController extends BaseController {
    
    protected $updateRequest;

    public function index(Request $request, $id) {
       
        return $this->executeAction(function() use ($request, $id) {
     
            if(isset($this->updateRequest)){
                $this->updateRequest->merge($request->all());
                $this->updateRequest->validate($this->updateRequest->rules());
            }
            
            $useCase = new UpdateFormField(new FormFieldRepository);
            return $useCase->execute(new FormFieldDto($request->all()), $id);
        });
    }
}
