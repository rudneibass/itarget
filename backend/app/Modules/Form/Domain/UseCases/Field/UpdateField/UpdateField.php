<?php

namespace App\Modules\Form\Domain\UseCases\Field\UpdateField;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Exception;

class UpdateField {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FieldRepository(
            fieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(array $requestData, $id): int {
        $formField = $this->repository->getById($id);
        if (!$formField) { 
            throw new Exception("Não foi possivel localizar fomulário com id ".$id."");
        }
        $formField->name = $requestData['name'] ?? $formField->name;
        $formField->attributes = $requestData['attributes'] ?? $formField->attributes;
        return $this->repository->update($formField);
    }
}