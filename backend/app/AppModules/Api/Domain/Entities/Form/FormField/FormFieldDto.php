<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;

class FormFieldDto
{
    public string $id;
    public string $formId;
    public string $name;
    public string $isActive;
    public ?string $rules;
    public ?string $value;
    public ?array $options;
    public ?string $dataSource;
    public array $attributes;

    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->formId = $data['form_id'];
        $this->name = $data['name'];
        $this->rules = $data['rules'];
        $this->isActive = $data['is_active'];
        $this->value = $data['value'] ?? null;
        $this->options = $data['options'] ?? null;
        $this->dataSource = $data['data_source'] ?? '';
        $this->attributes = $data['attributes'];
    }
}
