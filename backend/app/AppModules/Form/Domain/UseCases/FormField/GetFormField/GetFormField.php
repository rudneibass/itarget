<?php

namespace App\AppModules\Form\Domain\UseCases\FormField\GetFormField;

use App\AppModules\Form\Domain\Entities\FormField\FormFieldRepository;


class GetFormField {
    private $formFieldRepository;

    public function __construct(FormFieldRepository $formFieldRepository){
        $this->formFieldRepository = $formFieldRepository;
    }

    public function execute(string $id): array {
        $formField = $this->formFieldRepository->get($id);
        return [
            'id' => $formField->id,
            'form_id' => $formField->formId,
            'name' => $formField->name,
            'display_name' => $formField->displayName,
            'rules' => $formField->rules,
            'attributes' => json_encode($formField->attributes)
        ];
    }
}