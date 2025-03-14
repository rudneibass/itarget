<?php

namespace App\Modules\Form\Domain\UseCases\Field\GetFieldCreateForm;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Repositories\FormFieldOption\Database\FormFieldOptionRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;

class GetFieldCreateForm {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FieldRepository(
            formFieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(){
        $formField = $this->repository->getFormCreateByName(Field::FORM_NAME);
        $fields = 
        array_map(
            function($field) {
                $field['attributes'] = json_decode($field['attributes'], true);
                if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                    $methodDataSource = $field['attributes']['data_source'];
                    if (method_exists(FormFieldOptionRepository::class, $methodDataSource)) {
                        $field['options'] = FormFieldOptionRepository::$methodDataSource($field['id']);
                    }
                }
                return $field;
            }, $formField->fields
        );
        
        return [
            'id' => $formField->id,
            'name' => $formField->name,
            'attributes' => json_decode($formField->attributes, true),
            'fields' =>  $fields
        ];
    }
}