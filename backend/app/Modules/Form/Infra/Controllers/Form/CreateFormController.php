<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\Form;
use App\Modules\Form\Domain\UseCases\Form\CreateForm\CreateForm;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter\ModelAdapter;
use Illuminate\Http\Request;


class CreateFormController extends BaseController {
    
    protected $createRequest;

    public function handle(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new CreateForm(new ModelAdapter(new Form()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
