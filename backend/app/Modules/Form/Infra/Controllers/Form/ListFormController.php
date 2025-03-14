<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Domain\UseCases\Form\ListForm\ListForm;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\Form;
use Illuminate\Http\Request;

class ListFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = 
            new ListForm(
                databaseAdapter: new DatabaseAdapter(), 
                modelAdapter: new ModelAdapter(new Form)
            );
            return $useCase->execute($request->all());
        });
    }
}
