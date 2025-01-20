<?php

namespace App\Modules\Api\Domain\UseCases\FormField\GetFormFieldForm;

use App\Modules\Api\Domain\Entities\Form\Form;
use App\Modules\Api\Infra\Repositories\Form\Database\FormFieldDataSourceRepository;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormFieldForm {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(){
        $form = $this->repository->get(Form::NAME_FORM_FIELD);
        $fields = 
        array_map(
            function($field) {
                $field['attributes'] = json_decode($field['attributes'], true);
                if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                    $methodDataSource = $field['attributes']['data_source'];
                    if (method_exists(FormFieldDataSourceRepository::class, $methodDataSource)) {
                        $field['options'] = FormFieldDataSourceRepository::$methodDataSource($field['id']);
                    }
                }
                return $field;
            }, 
            $form->fields
        );
        
        return [
            'id' => $form->id,
            'name' => $form->name,
            'attributes' => json_decode($form->attributes, true),
            'fields' =>  $fields
        ];
    }
}