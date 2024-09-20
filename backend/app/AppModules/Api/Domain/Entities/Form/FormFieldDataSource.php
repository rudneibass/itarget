<?php
namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\FieldOptionDto;

class FormFieldDataSource {

    public static function evento(){
        return [
            new FieldOptionDto([
                "value" => "0",
                "label" => "Selecione"
            ]),
            new FieldOptionDto([
                "value" => "Values",
                "label" => "Label",
                "selecte" => "selecte"
            ]),
        ];
    }
}