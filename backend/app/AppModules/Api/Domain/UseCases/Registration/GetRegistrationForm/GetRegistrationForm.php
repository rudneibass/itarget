<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationForm;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Entities\Form\FormFieldDataSource;
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
                $methodDataSource = $field->name;
                if (method_exists(FormFieldDataSource::class, $methodDataSource)) {
                    $field->options = FormFieldDataSource::$methodDataSource();
                }
            }
            return $field;
        }, $form->fields);
        
        return [
            'id' => $form->id,
            'name' => $form->name,
            'metadata' => $form->metadata,
            'is_active' => $form->isActive,
            'fields' =>  $fields
        ];
    }
}