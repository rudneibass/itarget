<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;

class FormFieldDto
{
    public string $formId;
    public string $name;
    public array $attributes;
    public ?string $id;
    public ?string $rules;

    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->formId = $data['form_id'];
        $this->name = $data['name'];
        $this->rules = $data['rules'];
        $this->attributes = $data['attributes'];
    }
}
