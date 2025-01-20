<?php

namespace App\Modules\Event\Domain\UseCases\Registration\GetRegistrationForm;

use App\Modules\Form\Infra\Repositories\Form\Database\FormFieldDataSourceRepository;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Entities\Form\Form;

class GetRegistrationForm {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(){
        $form = $this->repository->get(Form::NAME_FORM_REGISTRATION);
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