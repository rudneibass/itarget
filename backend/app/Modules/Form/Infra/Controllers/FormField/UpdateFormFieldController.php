<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Domain\UseCases\FormField\UpdateFormField\UpdateFormField;
use App\Modules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
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
            return $useCase->execute($request->all(), $id);
        });
    }
}
