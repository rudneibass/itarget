<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Base\BaseController;
use App\Modules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\Modules\Form\Infra\Adapters\DatabaseAdapter;
use App\Modules\Form\Infra\Adapters\ListServiceAdapter;
use App\Modules\Form\Infra\Adapters\ModelAdapter;
use App\Modules\Form\Infra\Models\EloquentORM\Form;
use App\Modules\Integrations\Services\Internal\List\ListService;
use Illuminate\Http\Request;

class GetFormCreateController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new  GetFormCreate(
              modelAdapter:  new ModelAdapter(new Form()), 
              databaseAdapter:  new DatabaseAdapter(),
              listServiceAdapter:  new ListServiceAdapter(new ListService())
            ); 
            return $useCase->execute($request->get('form_name', null));
        });
    }
}
