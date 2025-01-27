<?php

namespace App\Modules\Form\Domain\UseCases\FormField\GetFormCreate;

use App\Modules\Form\Domain\Entities\FormField\FormField;
use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Repositories\FormFieldOption\Database\FormFieldOptionRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class GetFormCreate {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormFieldRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(){
        $FormField = $this->repository->getByName(FormField::FORM_NAME);

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
            }, $FormField->fields
        );

        return [
            'id' => $FormField->id,
            'name' => $FormField->name,
            'attributes' => json_decode($FormField->attributes, true),
            'fields' =>  $fields
        ];
    }
}