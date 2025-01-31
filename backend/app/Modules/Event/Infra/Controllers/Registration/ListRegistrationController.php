<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Infra\Base\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
use Illuminate\Http\Request;

class ListRegistrationController extends BaseController {
    public function handle(Request $request) {
        return $this->executeAction(function() use ($request) {
            $useCase = new ListRegistration(new ModelAdapter(new Registration), new DatabaseAdapter);
            return $useCase->execute($request->all());
        });
    }
}
