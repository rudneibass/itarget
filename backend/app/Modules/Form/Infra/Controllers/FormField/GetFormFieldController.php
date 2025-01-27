<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\UseCases\FormField\GetFormField\GetFormField;

use App\Modules\Form\Infra\Models\EloquentORM\Form;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;

class GetFormFieldController extends BaseController {
    public function handle(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetFormField(new ModelAdapter(new Form()), new DatabaseAdapter());
            return $useCase->execute($name);
        });
    }
}