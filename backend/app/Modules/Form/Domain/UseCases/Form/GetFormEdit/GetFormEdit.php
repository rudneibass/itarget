<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormEdit;

use App\Modules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;

use App\Modules\Form\Domain\Repositories\FormFieldDataSource\Database\FormFieldDataSourceRepository;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Repositories\Factory\RepositoryFactory;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;


class GetFormEdit {
    private $repository;
    private $repositoryFactory;
  
    public function __construct(private Model $modelAdapter, private Database $databaseAdapter) {
        $this->repository = new FormRepository($this->modelAdapter, $this->databaseAdapter);
        $this->repositoryFactory = new RepositoryFactory($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(array $request){
        
        $useCase = new GetFormCreate($this->modelAdapter, $this->databaseAdapter);
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

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'searchable') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                    $field['attributes']['data_value_description'] = '';
                    
                    if(filter_var($field['attributes']['data_source'], FILTER_VALIDATE_URL)){
                        $parsedUrl = parse_url($field['attributes']['data_source']);
                        $repository = $this->repositoryFactory->getRepository($parsedUrl['path']);
                        $entityDataSource = $repository->getByName($entityData[$field['name']]);
                        $field['attributes']['data_value_description'] = $entityDataSource->displayName;
                    }
                    
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                    $entityDataSource = $field['attributes']['data_source'];

                    if (method_exists(FormFieldDataSourceRepository::class, $entityDataSource)) {
                        $field->options = FormFieldDataSourceRepository::$entityDataSource();
                    }
                }
            }
            return $field;

        }, $form['fields']);
        

        return $form;
    }
}