<?php

namespace App\AppModules\Api\Domain\UseCases\FormField\GetFormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldRepository;


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
            'attributes' => json_encode($formField->attributes)
        ];
    }
}