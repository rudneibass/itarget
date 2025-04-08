<?php

namespace App\Modules\Form\Infra\Controllers\Field;

use App\Modules\Form\Domain\UseCases\Field\GetField\GetField;
use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter\ModelAdapter;

class GetFieldController extends BaseController {
    public function handle(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetField(
                modelAdapter: new ModelAdapter(new FormField()), 
                databaseAdapter: new DatabaseAdapter()
            );
            return $useCase->execute($name);
        });
    }
}