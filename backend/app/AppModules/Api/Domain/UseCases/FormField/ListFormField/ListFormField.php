<?php

namespace App\AppModules\Api\Domain\UseCases\FormField\ListFormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldRepository;

class ListFormField {
    private $formFieldRepository;

    public function __construct(FormFieldRepository $formFieldRepository){
        $this->formFieldRepository = $formFieldRepository;
    }

    public function execute(array $params = []): array {
        return array_map(function($formField){
            return [
                'id' => $formField->id,
                'form_id' => $formField->formId,
                'name' => $formField->name,
                'display_name' => $formField->displayName,
                'attributes' => json_encode($formField->attributes)
            ];
        }, $this->formFieldRepository->findAllByParams($params));
    }
}