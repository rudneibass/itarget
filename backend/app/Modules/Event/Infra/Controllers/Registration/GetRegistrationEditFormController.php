<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Domain\UseCases\Registration\GetRegistrationEditForm\GetRegistrationEditForm;
use App\Modules\Event\Infra\Base\BaseController;
use App\Modules\Event\Infra\Adapters\FormServiceAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Services\Form\FormService;
use Illuminate\Http\Request;

class GetRegistrationEditFormController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new GetRegistrationEditForm(new ModelAdapter(new Registration), new DatabaseAdapter, new FormServiceAdapter(new FormService));
            return $useCase->execute($request->all());
        });
    }
}
