<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Domain\UseCases\Form\GetForm\GetForm;
use App\Modules\Form\Infra\Controllers\BaseController;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;

class GetFormController extends BaseController {
    public function index(string $name) {
        return $this->executeAction(function() use ($name){
            $useCase = new GetForm(new FormRepository); 
            return $useCase->execute($name);
        });
    }
}
