<?php

namespace App\AppModules\Api\Domain\Services\Form;

use App\AppModules\Api\Infra\Repositories\FormFieldRepository;
use App\AppModules\Api\Infra\Repositories\FormRepository;

class DCOFormFieldsByFormId {
    public array $compositeObject;

    public function __construct(int $formId){
        $formRepository = new FormRepository;
        $fieldRepository = new FormFieldRepository;

        $form = $formRepository->getById($formId)->toArray();
        $form['fields'] = $fieldRepository->findAllByParams(array('form_id' => $form['id']));
        
        $this->compositeObject = $form;
    }
}