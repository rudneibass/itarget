<?php

namespace App\Modules\Form\Infra\Controllers\Field;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\FormField;
use App\Modules\Form\Domain\UseCases\Field\GetFieldEditForm\GetFieldEditForm;
use App\Modules\Form\Infra\Adapters\ListServiceAdapter\ListServiceAdapter;
use App\Modules\Integrations\Services\Internal\List\ListService;
use Illuminate\Http\Request;

class GetFieldEditFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFieldEditForm(
               modelAdapter: new ModelAdapter(new FormField()), 
               databaseAdapter: new DatabaseAdapter(),
               listServiceAdapter: new ListServiceAdapter(new ListService())
            );
            return $useCase->execute($request->all());
        });
    }
}
