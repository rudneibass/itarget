<?php

namespace App\Modules\Form\Infra\Controllers\Field;

use App\Modules\Form\Domain\UseCases\Field\CreateField\CreateField;
use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter\ModelAdapter;


use Illuminate\Http\Request;


class CreateFieldController extends BaseController {
    
    protected $createRequest;

    public function handle(Request $request) {
       
        return $this->executeAction(function() use ($request) {
     
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            
            $useCase = new CreateField(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
