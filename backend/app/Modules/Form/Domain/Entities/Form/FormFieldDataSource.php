<?php

namespace App\Modules\Form\Domain\Entities\Form;

use App\Modules\Form\Domain\Entities\FormFieldOption\FormFieldOptionDto;

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