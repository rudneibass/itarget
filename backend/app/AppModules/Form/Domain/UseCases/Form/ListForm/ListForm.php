<?php

namespace App\AppModules\Form\Domain\UseCases\Form\ListForm;
use App\AppModules\Form\Domain\Entities\Form\FormRepository;

class ListForm {
    private $repository;

    public function __construct(FormRepository $formRepository){
        $this->repository = $formRepository;
    }

    public function execute(array $params = []): array {
        return array_map(function($form){
            return [
                'id' => $form->id,
                'name' => $form->name,
                'attributes' => $form->attributes
            ];
        }, $this->repository->findAllByParams($params));
    }
}