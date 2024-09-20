<?php

namespace App\AppModules\Api\Domain\Entities\Form;

class FieldDto
{
    public string $id;
    public string $form_id;
    public string $name;
    public string $isActive;
    public ?string $rules;
    public ?string $value;
    public ?array $options;
    public ?string $dataSource;
    public array $attributes;

    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->form_id = $data['form_id'];
        $this->name = $data['name'];
        $this->rules = $data['rules'];
        $this->isActive = $data['is_active'];
        $this->value = $data['value'] ?? null;
        $this->options = $data['options'] ?? null;
        $this->dataSource = $data['data_source'] ?? '';
        $this->attributes = $data['attributes'];
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'form_id' => $this->form_id,
            'name' => $this->name,
            'rules' => $this->rules,
            'is_active' => $this->isActive,
            'value' => $this->value,
            'options' => $this->options,
            'data_source' => $this->dataSource,
            'attributes' => $this->attributes,
        ];
    }
}
