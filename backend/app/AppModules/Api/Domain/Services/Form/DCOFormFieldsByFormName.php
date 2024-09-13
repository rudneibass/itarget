<?php

namespace App\AppModules\Api\Domain\Services\Form;

use App\AppModules\Api\Infra\Repositories\FormFieldRepository;
use App\AppModules\Api\Infra\Repositories\FormRepository;

class DCOFormFieldsByFormName {
    public $compositeObject;

    public function __construct(string $name){
        $formRepository = new FormRepository;
        $fieldRepository = new FormFieldRepository;
        $form_sdtClass = $formRepository->findAllByParams(array('name' => $name));
        $form_array = get_object_vars($form_sdtClass[0]);
        $form_array['fields'] = $fieldRepository->findAllByParams(array('form_id' => $form_array['id'], 'order' => 'order'));
        $form_array['attributes'] = json_decode($form_array['metadata'], true);
        $fields_array = array_map(function($item){
            $item->attributes = json_decode($item->metadata, true);
            return $item;
        }, $form_array['fields']);
        
        $form_array['fields'] = $fields_array;
        $this->compositeObject = $form_array;
    }
}