<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetForm;

use App\Modules\Form\Domain\Entities\Form\FormRepository;

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