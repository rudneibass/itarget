<?php

namespace App\AppModules\Api\Domain\UseCases\FormField\UpdateFormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldRepository;
use Exception;

class UpdateFormField {
    private $repository;

    public function __construct(FormFieldRepository $repository){
        $this->repository = $repository;
    }

    public function execute(array $requestData, $id): int {
        
        $formField = $this->repository->get($id);

        if (!$formField) { throw new Exception("Não foi possivel localizar campo com id ".$id."");}

        $formField->name = $requestData['name'] ?? $formField->name;
        $formField->attributes = $requestData['attributes'] ?? $formField->attributes;
        $formField->rules = $requestData['rules'] ?? $formField->rules;
        $formField->order = $requestData['order'] ?? $formField->order;

        return $this->repository->update($formField);
    }
}