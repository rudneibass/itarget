<?php

namespace App\AppModules\Form\Infra\Controllers\Form;

use App\AppModules\Form\Domain\UseCases\Form\GetForm\GetForm;
use App\AppModules\Form\Infra\Controllers\BaseController;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;

class GetFormController extends BaseController {
    public function index(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetForm(new FormRepository); 
            return $useCase->execute($name);
        });
    }
}
