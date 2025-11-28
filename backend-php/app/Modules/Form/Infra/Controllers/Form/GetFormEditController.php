<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Domain\UseCases\Form\GetFormEdit\GetFormEdit;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ListServiceAdapter\ListServiceAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\Form;
use App\Modules\Integrations\Services\Internal\List\ListService;
use Illuminate\Http\Request;

class GetFormEditController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new GetFormEdit(
                modelAdapter:  new ModelAdapter(new Form()), 
                databaseAdapter:  new DatabaseAdapter(),
                listServiceAdapter:  new ListServiceAdapter(new ListService())
            );
            return $useCase->execute($request->all());
        });
    }
}
