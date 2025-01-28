<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Domain\UseCases\FormField\GetFormEdit\GetFormEdit;

use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
