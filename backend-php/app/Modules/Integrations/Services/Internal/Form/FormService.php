<?php

namespace App\Modules\Integrations\Services\Internal\Form;

use App\Modules\Form\Infra\Controllers\Form\GetFormController;

class FormService {
    public function getByName(string $name){
        $controller =  new GetFormController();
        return $controller->handle($name);
    }
}