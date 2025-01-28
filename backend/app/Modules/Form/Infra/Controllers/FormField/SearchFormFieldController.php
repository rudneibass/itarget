<?php

namespace App\Modules\Form\Infra\Controllers\FormField;

use App\Modules\Form\Domain\UseCases\FormField\PaginateFormField\PaginateFormField;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use Illuminate\Http\Request;

class SearchFormFieldController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateFormField(new ModelAdapter(new FormField()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
