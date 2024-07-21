<?php

namespace App\Services\Api\Form; 

use App\Repositories\Api\FormFieldRepository;
use App\Repositories\Api\FormRepository;

class DOCFormFieldsByFormId {
    public array $compositeObject;

    public function __construct(int $formId){
        $formRepository = new FormRepository;
        $fieldRepository = new FormFieldRepository;

        $form = $formRepository->get($formId)->toArray();
        $form['fields'] = $fieldRepository->findAllByParams(array('form_id' => $form['id']));
        
        $this->compositeObject = $form;
    }
}