<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormEdit;

use App\Modules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;

class GetFormEdit {
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private Database $databaseAdapter, 
        private ListService $listServiceAdapter
    ) {
        $this->repository = new FormRepository($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(array $request){
        
        $useCase = new GetFormCreate($this->modelAdapter, $this->databaseAdapter, $this->listServiceAdapter);
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

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'searchable') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){                    
                    $field['attributes']['value'] = $entityData[$field['name']];
                    $field['attributes']['data_value_description'] = '';
                    if(isset($field['attributes']['module']) && isset($field['attributes']['module']) &&
                        isset($field['attributes']['entity']) && isset($field['attributes']['entity'])
                    ){
                        $list = 
                        $this->listServiceAdapter->getList(
                            $module = $field['attributes']['module'], 
                            $entity = $field['attributes']['entity'],
                            $filter = ['id' => $entityData[$field['name']]]
                        );

                        $field['attributes']['data_value_description'] = $list[0]['id'];
                    }
                }
            }
            
            return $field;

        }, $form['fields']);
        

        return $form;
    }
}