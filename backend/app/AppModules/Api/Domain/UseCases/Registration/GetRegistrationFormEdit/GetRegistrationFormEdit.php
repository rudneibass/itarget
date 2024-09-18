<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit;

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

        $form['fields'] = 
        array_map(function ($field) use ($registration) {
            if (isset($registration[$field->name])) {
                $field->value = $registration[$field->name];
            }
            return $field;
        }, $form['fields']);

        return  $form;
    }
}