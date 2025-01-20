<?php
namespace App\Modules\Api\Domain\Entities\Form;

use App\Modules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;

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