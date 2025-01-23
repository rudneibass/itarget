<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Domain\UseCases\Form\PaginateForm\PaginateForm;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Models\EloquentORM\Form;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use Illuminate\Http\Request;

class PaginateFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new PaginateForm(new ModelAdapter(new Form ()), new DatabaseAdapter());
            return $useCase->execute($request->all());
        });
    }
}
