<?php

namespace App\Modules\Api\Infra\Controllers\FormField;

use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Domain\UseCases\FormField\UpdateFormField\UpdateFormField;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
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
