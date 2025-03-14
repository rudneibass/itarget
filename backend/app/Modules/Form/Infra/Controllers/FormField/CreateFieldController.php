<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Domain\UseCases\FormField\CreateFormField\CreateFormField;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use Illuminate\Http\Request;


class CreateFormFieldController extends BaseController {
    
    protected $createRequest;

    public function handle(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new CreateFormField(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
