<?php

namespace App\Modules\Api\Domain\UseCases\Form\GetFormEdit;

use App\Modules\Api\Domain\Entities\Form\FormFieldDataSource;
use App\Modules\Api\Domain\Entities\Form\FormRepository;
use App\Modules\Api\Domain\Interfaces\Repository;
use App\Modules\Api\Domain\Interfaces\RepositoryFactory;
use App\Modules\Api\Domain\UseCases\Form\GetFormCreate\GetFormCreate;

class GetFormEdit {
    private $repository;
    private $formRepository;
    private $repositoryFactory;

    public function __construct(
        FormRepository $formRepository, 
        RepositoryFactory $repositoryFactory,
        Repository $repository
    ){
        $this->repository = $repository;
        $this->formRepository = $formRepository;
        $this->repositoryFactory = $repositoryFactory;
    }

    public function execute(array $request){
        
        $useCase = new GetFormCreate($this->formRepository);
        $form = $useCase->execute($request['form_name']);

        $entity = $this->repository->get($request['id']);
        $entityData = $entity->toArray();

        $form['fields'] = array_map(function($field)  use ($entityData) {
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
                        $entityDataSource = $repository->get($entityData[$field['name']]);
                        $field['attributes']['data_value_description'] = $entityDataSource->displayName;
                    }
                    
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                    $entityDataSource = $field['attributes']['data_source'];

                    if (method_exists(FormFieldDataSource::class, $entityDataSource)) {
                        $field->options = FormFieldDataSource::$entityDataSource();
                    }
                }
            }
            return $field;
        }, $form['fields']);
        
        return  $form;
    }

    /*
    public function execute(array $request){
        
        $useCase = new GetFormCreate($this->formRepository);
        $form = $useCase->execute($request['form_name']);

        $entity = $this->repository->get($request['id']);
        $entityData = $entity->toArray();

        $form['fields'] = array_map(function($field)  use ($entityData) {
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
                        $entityDataSource = $repository->get($entityData[$field['name']]);
                        $field['attributes']['data_value_description'] = $entityDataSource->displayName;
                    }
                    
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                if(isset($entityData[$field['name']]) && !empty($entityData[$field['name']])){
                    $field['attributes']['value'] = $entityData[$field['name']];
                    $entityDataSource = $field['attributes']['data_source'];

                    if (method_exists(FormFieldDataSource::class, $entityDataSource)) {
                        $field->options = FormFieldDataSource::$entityDataSource();
                    }
                }
            }
            return $field;
        }, $form['fields']);
        
        return  $form;
    }*/
}