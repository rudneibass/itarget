<?php

namespace App\Modules\Services\Form;

use App\Modules\Form\Infra\Controllers\Form\GetFormController;
use Illuminate\Http\Request;

class FormService {

    public function getByName(string $name){
        $controller =  new GetFormController();
        return $controller->handle($name);
    }
}