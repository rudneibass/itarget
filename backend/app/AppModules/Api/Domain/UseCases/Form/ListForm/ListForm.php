<?php

namespace App\AppModules\Api\Domain\UseCases\Form\ListForm;
use App\AppModules\Api\Domain\Entities\Form\FormRepositoryInterface;

class ListForm {
    private $repository;

    public function __construct(FormRepositoryInterface $formRepository){
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