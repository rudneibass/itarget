<?php

namespace App\Modules\Form\Domain\UseCases\Field\GetFieldEditForm;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use App\Modules\Form\Domain\UseCases\Field\GetFieldCreateForm\GetFieldCreateForm;

class GetFieldEditForm {
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private Database $databaseAdapter,
        private ListService $listServiceAdapter
    ) {
        $this->repository = 
        new FieldRepository(
            fieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(array $request){
        $useCase = new GetFieldCreateForm(
           modelAdapter: $this->modelAdapter, 
           databaseAdapter: $this->databaseAdapter, 
           listServiceAdapter: $this->listServiceAdapter
        );
        $form = $useCase->execute();

        $entity = $this->repository->getById($request['id']);
        $entityData = $entity->toArray();

        $form['fields'] = 
        array_map(function($field)  use ($entityData) {
            if(isset($entityData[$field['name']]) && is_array($entityData[$field['name']])){
                $entityData[$field['name']] = json_encode($entityData[$field['name']]);
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'text'){
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'textarea'){
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'checkbox'){
                if(isset($entityData[$field['name']]) && $entityData[$field['name']] === '1'){
                    $field['attributes']['checked'] = 'checked';
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                }
            }

            # Refazer o searchable com o listService
            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'searchable') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                }
            }
            
            return $field;

        }, $form['fields']);
        

        return $form;
    }
}