<?php

namespace App\Modules\Form\Domain\UseCases\Form\ListForm;

use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class ListForm {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(array $params = []): array {        
        return array_map(function($form){
            return [
                'id' => $form->id,
                'name' => $form->name,
                'attributes' => $form->attributes,
                'option_value' => $form->id,
                'option_text' => $form->name
            ];
        }, $this->repository->findAllByParams($params));
    }
}