<?php

namespace App\Modules\Api\Infra\Controllers\Form;

use App\Modules\Api\Domain\UseCases\Form\GetForm\GetForm;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormController extends BaseController {
    public function index(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetForm(new FormRepository); 
            return $useCase->execute($name);
        });
    }
}
