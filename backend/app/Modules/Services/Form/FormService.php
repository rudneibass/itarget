<?php

namespace App\Modules\Services\Form;

use App\Modules\Form\Infra\Controllers\Form\GetFormCreateController;
use Illuminate\Http\Request;

class FormService {

    public function getFormCreateByName(string $name){
        $controller =  new GetFormCreateController();
        return $controller->handle(new Request(['form_name' => $name]));
    }
}