<?php

namespace App\Modules\Form\Domain\UseCases\Form\UpdateForm;

use App\Modules\Form\Domain\Entities\Form\FormRepository;
use Exception;

class UpdateForm {
    private $repository;

    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(array $requestData, $id): int {
        
        $formField = $this->repository->get($id);

        if (!$formField) { throw new Exception("Não foi possivel localizar campo com id ".$id."");}

        $formField->name = $requestData['name'] ?? $formField->name;
        $formField->attributes = $requestData['attributes'] ?? $formField->attributes;

        return $this->repository->update($formField);
    }
}