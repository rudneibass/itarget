<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit;

use App\AppModules\Api\Domain\Entities\Form\FormFieldDataSource;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;
use App\AppModules\Api\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;

class GetRegistrationFormEdit {
    private $repository;
    
    public function __construct(RegistrationRepositoryInterface $repository){
        $this->repository = $repository;
    }

    public function execute(string $id){
        $formUseCase = new GetRegistrationForm(new FormRepository);
        $form = $formUseCase->execute();

        $registrationUseCase = new GetRegistration($this->repository);
        $registration = $registrationUseCase->execute($id);

        $form['fields'] = array_map(function($field)  use ($registration) {
            
            if (isset($field->attributes['type']) && $field->attributes['type'] === 'text'){
                $field->attributes['value'] = $registration[$field->attributes['name']];
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'checkbox'){
                if(isset($registration[$field->attributes['name']]) && $registration[$field->attributes['name']] === '1'){
                    $field->attributes['checked'] = 'checked';
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'searchable') {
                if(isset($registration[$field->attributes['name']])){
                    $field->attributes['value'] = $registration[$field->attributes['name']];
                    $field->attributes['data_value_description'] = $registration['display_name'];
                }
            }

            if (isset($field->attributes['type']) && $field->attributes['type'] === 'select') {
                $field->attributes['value'] = $registration[$field->attributes['name']];
                $dataSource = $field->attributes['data_source'];

                if (method_exists(FormFieldDataSource::class, $dataSource)) {
                    $field->options = FormFieldDataSource::$dataSource();
                }
            }

            return $field;
        }, $form['fields']);

        return  $form;
    }
}