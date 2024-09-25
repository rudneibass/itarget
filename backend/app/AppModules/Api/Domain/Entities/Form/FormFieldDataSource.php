<?php
namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;

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