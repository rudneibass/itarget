<?php

namespace App\Modules\Event\Domain\UseCases\Registration\GetRegistrationEditForm;

use App\Modules\Event\Domain\Repositories\Registration\Database\RegistrationRepository;
use App\Modules\Event\Domain\Interfaces\FormService;
use App\Modules\Event\Domain\Interfaces\Database;
use App\Modules\Event\Domain\Interfaces\Model;

class GetRegistrationEditForm {

    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter, private FormService $formServiceAdapter){
        $this->repository = new RegistrationRepository($modelAdapter, $databaseAdapter);
    }


    public function execute(array $request): array {
        $registration = $this->repository->get($request['id'])->toArray();
        $form = $this->formServiceAdapter->getByName($request['form_name']);
        $form['fields'] = 
        array_map(function($field)  use ($registration) {
            if(isset($registration[$field['name']]) && is_array($registration[$field['name']])){
                $registration[$field['name']] = json_encode($registration[$field['name']]);
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'text'){
                if(isset($registration[$field['name']]) && !empty($registration[$field['name']])){
                    $field['attributes']['value'] = $registration[$field['name']];
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'textarea'){
                if(isset($registration[$field['name']]) && !empty($registration[$field['name']])){
                    $field['attributes']['value'] = $registration[$field['name']];
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'checkbox'){
                if(isset($registration[$field['name']]) && $registration[$field['name']] === '1'){
                    $field['attributes']['checked'] = 'checked';
                }
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'searchable') {
                if(isset($registration[$field['name']]) && !empty($registration[$field['name']])){
                    $field['attributes']['value'] = $registration[$field['name']];
                    $field['attributes']['data_value_description'] = '';
                    
                    if(filter_var($field['attributes']['data_source'], FILTER_VALIDATE_URL)){
                        $parsedUrl = parse_url($field['attributes']['data_source']);

                        /*$repository = $this->repositoryFactory->getRepository($parsedUrl['path']);
                        $registrationSource = $repository->getByName($registration[$field['name']]);
                        $field['attributes']['data_value_description'] = $registrationSource->displayName;*/
                    }
                    
                }
                
            }

            if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                if(isset($registration[$field['name']]) && !empty($registration[$field['name']])){
                    $field['attributes']['value'] = $registration[$field['name']];
                    $optionsDataSource = $field['attributes']['data_source'];

                    /*if (method_exists(FormFieldOptionRepository::class, $optionsDataSource)) {
                        $field->options = FormFieldOptionRepository ::$optionsDataSource();
                    }*/
                }
            }
            
            return $field;

        }, $form['fields']);

        return $form;
    }
}