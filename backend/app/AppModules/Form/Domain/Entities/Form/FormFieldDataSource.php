<?php

namespace App\AppModules\Form\Domain\Entities\Form;

use App\AppModules\Form\Domain\Entities\FormFieldOption\FormFieldOptionDto;

class FormFieldDataSource {

    public static function evento(){
        return [
            new FormFieldOptionDto([
                "value" => "0",
                "label" => "Selecione"
            ]),
            new FormFieldOptionDto([
                "value" => "Values",
                "label" => "Label",
                "selecte" => "selecte"
            ]),
        ];
    }
}