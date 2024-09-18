<?php

namespace App\AppModules\Api\Domain\Entities\Form;

class FieldDto
{
    public string $id;
    public string $form_id;
    public string $name;
    public ?string $rules;
    public string $isActive;
    public ?string $value;
    public array $attributes;

    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->form_id = $data['form_id'];
        $this->name = $data['name'];
        $this->rules = $data['rules'];
        $this->isActive = $data['is_active'];
        $this->value = $data['value'] ?? null;
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
            'attributes' => $this->attributes,
        ];
    }
}
