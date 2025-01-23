<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetForm;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;

class GetForm {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(string $name){
        $form = $this->repository->get($name);

        return [
            'id' => $form->id,
            'name' => $form->name,
            'attributtes' => json_decode($form->attributes, true),
            'fields' => array_map(function($field){
                return $field;
            }, $form->fields)
        ];
    }
}