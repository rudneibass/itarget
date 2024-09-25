<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormFieldOption;

class FormFieldOptionDto {

    public string $formFieldId;
    public string $name;
    public string $value;
    public ?string $isActive;
    public ?string $selected;
    public ?string $order;
    public ?string $id;
    
    public function __construct(array $data)
    {
        $this->formFieldId = $data['form_field_id'];
        $this->name = $data['name'];
        $this->value = $data['value'];
        $this->isActive = $data['is_active'] ?? null;
        $this->selected = $data['selected'] ?? null;
        $this->order = $data['order'] ?? null;
        $this->id = $data['id'] ?? null;
    }
}