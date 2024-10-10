<?php

namespace App\AppModules\Api\Domain\UseCases\Form\GetFormCreate;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormFieldDataSourceRepository;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetFormCreate {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(string $formName){
        $form = $this->repository->get($formName);
        $fields = array_map(function($field) {
            if (isset($field->attributes['type']) && $field->attributes['type'] === 'select') {
                $methodDataSource = $field->attributes['data_source'];
                if (method_exists(FormFieldDataSourceRepository::class, $methodDataSource)) {
                    $field->options = FormFieldDataSourceRepository::$methodDataSource($field->id);
                }
            }
            return $field;
        }, $form->fields);
        
        return [
            'id' => $form->id,
            'name' => $form->name,
            'attributes' => $form->attributes,
            'fields' =>  $fields
        ];
    }
}