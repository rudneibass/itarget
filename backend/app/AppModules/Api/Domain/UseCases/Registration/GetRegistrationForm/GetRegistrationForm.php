<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationForm;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormFieldDataSourceRepository;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationForm {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(){
        $form = $this->repository->get(Form::NAME_FORM_REGISTRATION);
        $fields = array_map(function($field) {
            if (isset($field->attributes['type']) && $field->attributes['type'] === 'select') {
                
                $methodDataSource = $field->dataSource;
                if (method_exists(FormFieldDataSourceRepository::class, $methodDataSource)) {
                    $field->options = FormFieldDataSourceRepository::$methodDataSource($field->id);
                }
            }
            return $field;
        }, $form->fields);
        
        return [
            'id' => $form->id,
            'name' => $form->name,
            'metadata' => $form->metadata,
            'fields' =>  $fields
        ];
    }
}