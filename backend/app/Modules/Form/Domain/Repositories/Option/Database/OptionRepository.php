<?php

namespace App\Modules\Form\Domain\Repositories\Option\Database;

use App\Modules\Form\Domain\Entities\Option\OptionDto;
use App\Modules\Form\Infra\Models\EloquentORM\Form;
use App\Modules\Form\Infra\Models\EloquentORM\FormFieldOption;

class OptionRepository {

    public static function getOptions(string $formFieldId)
    {
        return 
        array_map(
            function($option){
                return 
                new OptionDto([
                    'id' => $option['id'],
                    'is_active' => $option['is_active'],
                    'form_field_id' => $option['form_field_id'],
                    'name' => $option['name'],
                    'value' => $option['value'],
                    'order' => $option['order']
                ]);
            }, FormFieldOption::where('form_field_id', $formFieldId)->get()->toArray()
        );
    }


    public static function getFormOptions()
    {
        return 
        array_map(
            function($event){
                return 
                new OptionDto([
                    'id' => $event['id'],
                    'form_field_id' => 0,
                    'name' => $event['name'],
                    'value' => $event['id'],
                ]);
            }, Form::all()->toArray()
        );
    }
}