<?php

namespace App\AppModules\Api\Domain\UseCases\Form\GetFormEdit;

use App\AppModules\Api\Domain\Entities\Form\FormFieldDataSource;
use App\AppModules\Api\Domain\Entities\Form\FormRepositoryInterface;
use App\AppModules\Api\Domain\Interfaces\Repository;
use App\AppModules\Api\Domain\Interfaces\RepositoryFactory;
use App\AppModules\Api\Domain\UseCases\Form\GetForm\GetForm;
use App\AppModules\Api\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

use function Ramsey\Uuid\v1;

class GetFormEdit {
    private $repository;
    private $formRepository;
    private $repositoryFactory;

    public function __construct(
        FormRepositoryInterface $formRepository, 
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
            if(isset($entityData[$field->attributes['name']]) && is_array($entityData[$field->attributes['name']])){
                $entityData[$field->attributes['name']] = json_encode($entityData[$field->attributes['name']]);
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'text'){
                if(isset($entityData[$field->attributes['name']]) && !empty($entityData[$field->attributes['name']])){
                    $field->attributes['value'] = $entityData[$field->attributes['name']];
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'textarea'){
                if(isset($entityData[$field->attributes['name']]) && !empty($entityData[$field->attributes['name']])){
                    $field->attributes['value'] = $entityData[$field->attributes['name']];
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'checkbox'){
                if(isset($entityData[$field->attributes['name']]) && $entityData[$field->attributes['name']] === '1'){
                    $field->attributes['checked'] = 'checked';
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'searchable') {
                if(isset($entityData[$field->attributes['name']]) && !empty($entityData[$field->attributes['name']])){
                    $field->attributes['value'] = $entityData[$field->attributes['name']];
                    $field->attributes['data_value_description'] = '';
                    
                    if(filter_var($field->attributes['data_source'], FILTER_VALIDATE_URL)){
                        $parsedUrl = parse_url($field->attributes['data_source']);
                        $repository = $this->repositoryFactory->getRepository($parsedUrl['path']);
                        $entityDataSource = $repository->get($entityData[$field->attributes['name']]);
                        $field->attributes['data_value_description'] = $entityDataSource->displayName;
                    }
                    
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'select') {
                if(isset($entityData[$field->attributes['name']]) && !empty($entityData[$field->attributes['name']])){
                    $field->attributes['value'] = $entityData[$field->attributes['name']];
                    $entityDataSource = $field->attributes['data_source'];

                    if (method_exists(FormFieldDataSource::class, $entityDataSource)) {
                        $field->options = FormFieldDataSource::$entityDataSource();
                    }
                }
            }

            return $field;
        }, $form['fields']);

        return  $form;
    }
}