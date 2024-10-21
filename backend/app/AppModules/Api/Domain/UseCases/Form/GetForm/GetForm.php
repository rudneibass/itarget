<?php

namespace App\AppModules\Api\Domain\UseCases\Form\GetForm;

use App\AppModules\Api\Domain\Entities\Form\FormRepository;

class GetForm {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
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