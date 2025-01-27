<?php

namespace App\Modules\Form\Domain\UseCases\FormField\GetFormField;

use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class GetFormField {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormFieldRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(string $name){
        $FormField = $this->repository->getByName($name);

        return [
            'id' => $FormField->id,
            'name' => $FormField->name,
            'attributtes' => json_decode($FormField->attributes, true),
            'fields' => array_map(function($field){
                return $field;
            }, $FormField->fields)
        ];
    }
}