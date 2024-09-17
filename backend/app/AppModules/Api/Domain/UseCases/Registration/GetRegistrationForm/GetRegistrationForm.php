<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationForm;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationForm {
    private $repository;
    
    public function __construct(FormRepository $repository){
        $this->repository = $repository;
    }

    public function execute(){
        $form = $this->repository->get(Form::NAME_FORM_REGISTRATION);
        return [
            'id' => $form->id,
            'name' => $form->name,
            'metadata' => $form->metadata,
            'is_active' => $form->isActive,
            'fields' => array_map(function($field){
                return $field;
            }, $form->fields)
        ];
    }
}