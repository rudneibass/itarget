<?php

namespace App\AppModules\Api\Infra\Repositories\Form\Database;
use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;
use App\AppModules\Api\Infra\Models\EloquentORM\Event;
use App\AppModules\Api\Infra\Models\EloquentORM\FormFieldOption as FormFieldOptionModel;

class FormFieldDataSourceRepository {

    public static function getOptions(string $formFieldId)
    {
        return 
        array_map(
            function($option){
                return 
                new FormFieldOptionDto([
                    'id' => $option['id'],
                    'is_active' => $option['is_active'],
                    'form_field_id' => $option['form_field_id'],
                    'name' => $option['name'],
                    'value' => $option['value'],
                    'order' => $option['order']
                ]);
            }, FormFieldOptionModel::where('form_field_id', $formFieldId)->get()->toArray()
        );
    }


    public static function getEventOptions()
    {
        return 
        array_map(
            function($event){
                return 
                new FormFieldOptionDto([
                    'id' => $event['id'],
                    'is_active' => '1',
                    'form_field_id' => '0',
                    'name' => $event['name'],
                    'value' => $event['id'],
                ]);
            }, Event::all()->toArray()
        );
    }
}