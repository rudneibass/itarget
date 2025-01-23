<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Api\Infra\Models\EloquentORM\Form;
use App\Modules\Form\Domain\UseCases\Form\GetForm\GetForm;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;

class GetFormController extends BaseController {
    public function handle(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetForm(new ModelAdapter(new Form()), new DatabaseAdapter());
            return $useCase->execute($name);
        });
    }
}