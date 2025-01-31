<?php

namespace App\Modules\Event\Infra\Controllers\Registration;

use App\Modules\Event\Infra\Base\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\UpdateRegistration\UpdateRegistration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
use Illuminate\Http\Request;

class UpdateRegistrationController extends BaseController {

    public function handle(Request $request, $id) {
        return $this->executeAction(function() use ($request, $id) {
            $useCase = new UpdateRegistration(new ModelAdapter(new Registration), new DatabaseAdapter);
            return $useCase->execute($request->all(), $id);
        });
    }
}
