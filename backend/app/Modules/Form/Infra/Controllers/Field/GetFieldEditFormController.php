<?php

namespace App\Modules\Form\Infra\Controllers\Field;

use App\Modules\Form\Domain\UseCases\FormField\GetFormEdit\GetFormEdit;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use Illuminate\Http\Request;

class GetFieldEditFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
