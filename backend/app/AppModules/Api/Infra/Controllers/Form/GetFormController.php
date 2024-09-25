<?php

namespace App\AppModules\Api\Infra\Controllers\Form;

use App\AppModules\Api\Domain\UseCases\Form\GetForm\GetForm;
use App\AppModules\Api\Infra\Controllers\BaseController;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormController extends BaseController {
    public function index(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetForm(new FormRepository); 
            return $useCase->execute($name);
        });
    }
}
