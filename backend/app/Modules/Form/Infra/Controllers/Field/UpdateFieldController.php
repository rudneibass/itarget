<?php

namespace App\Modules\Form\Infra\Controllers\Field;


use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use App\Modules\Form\Domain\UseCases\Field\UpdateField\UpdateField;
use Illuminate\Http\Request;

class UpdateFieldController extends BaseController {
    
    protected $updateRequest;

    public function handle(Request $request, $id) {
       
        return $this->executeAction(function() use ($request, $id) {
            if(isset($this->updateRequest)){
                $this->updateRequest->merge($request->all());
                $this->updateRequest->validate($this->updateRequest->rules());
            }
            $useCase = new UpdateField(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all(), $id);
        });
    }
}
