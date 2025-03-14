<?php

namespace App\Modules\Form\Domain\UseCases\Field\GetField;

use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class GetField {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FormFieldRepository(
            formFieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(string $name){
        $formField = $this->repository->getByName($name);

        return [
            'id' => $formField->id,
            'form_id' => $formField->formId,
            'name' => $formField->name,
            'rules' => $formField->rules,
            'is_active' => $formField->isActive,
            'attributes' => $formField->attributes,
            'data_source' => $formField->dataSource,
            'order' => $formField->order,
        ];
    }
}