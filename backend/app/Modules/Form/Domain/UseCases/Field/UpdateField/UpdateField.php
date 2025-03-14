<?php

namespace App\Modules\Form\Domain\UseCases\Field\UpdateField;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use Exception;

class UpdateField {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FormFieldRepository(
            formFieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(array $requestData, $id): int {
        $FormField = $this->repository->getById($id);
        if (!$FormField) { 
            throw new Exception("Não foi possivel localizar fomulário com id ".$id."");
        }
        $FormField->name = $requestData['name'] ?? $FormField->name;
        $FormField->attributes = $requestData['attributes'] ?? $FormField->attributes;
        return $this->repository->update($FormField);
    }
}