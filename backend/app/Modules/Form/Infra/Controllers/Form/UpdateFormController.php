<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Domain\UseCases\Form\UpdateForm\UpdateForm;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class UpdateFormController extends BaseController {
    
    protected $updateRequest;

    public function index(Request $request, $id) {
       
        return $this->executeAction(function() use ($request, $id) {
     
            if(isset($this->updateRequest)){
                $this->updateRequest->merge($request->all());
                $this->updateRequest->validate($this->updateRequest->rules());
            }
            
            $useCase = new UpdateForm(new FormRepository);
            return $useCase->execute($request->all(), $id);
        });
    }
}
