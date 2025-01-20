<?php

namespace App\Modules\Api\Domain\UseCases\Form\GetFormCreate;

use App\Modules\Api\Domain\Entities\Form\FormRepository;
use App\Modules\Api\Infra\Repositories\Form\Database\FormFieldDataSourceRepository;
class GetFormCreate {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(string $formName){
        $form = $this->repository->get($formName);
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