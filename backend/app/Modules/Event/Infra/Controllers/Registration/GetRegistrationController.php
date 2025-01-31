<?php

namespace App\Modules\Event\Infra\Controllers\Registration;


use App\Modules\Event\Infra\Base\BaseController;
use App\Modules\Event\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
class GetRegistrationController extends BaseController {
    public function handle(string $id) {
        return $this->executeAction(function() use ($id){
            $useCase = new GetRegistration(new ModelAdapter(new Registration), new DatabaseAdapter);
            return $useCase->execute($id);
        });
    }
}
