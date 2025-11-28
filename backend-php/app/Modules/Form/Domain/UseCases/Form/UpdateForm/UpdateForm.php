<?php

namespace App\Modules\Form\Domain\UseCases\Form\UpdateForm;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use Exception;

class UpdateForm {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(array $requestData, $id): int {
        
        $form = $this->repository->getById($id);

        if (!$form) { throw new Exception("Não foi possivel localizar fomulário com id ".$id."");}

        $form->name = $requestData['name'] ?? $form->name;
        $form->attributes = $requestData['attributes'] ?? $form->attributes;

        return $this->repository->update($form);
    }
}