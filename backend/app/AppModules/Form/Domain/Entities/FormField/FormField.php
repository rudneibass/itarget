<?php

namespace App\AppModules\Form\Domain\Entities\FormField;

use App\AppModules\Form\Domain\EntityBase;

class FormField extends EntityBase {

    private string $formId;
    private string $name;
    private string $attributes;
    private ?string $order = 'Não ordenado';
    private ?string $rules;

    public function __construct(FormFieldDto $dto) {
        $this->formId = $dto->formId;
        $this->name = $dto->name;
        $this->attributes = $dto->attributes;
        $this->rules = $dto->rules ?? null;

        if(isset($dto->id)){ $this->id = $dto->id; }
        if(isset($dto->order)){ $this->order = $dto->order; }
    }
    
    public function toArray() {
        return [
            'id' => isset($this->id) ? $this->id : null,
            'order' => isset($this->order) ? $this->order : null,
            'form_id' => $this->formId,
            'name' => $this->name,
            'display_name' => $this->displayName,
            'attributes' => $this->attributes,
            'rules' => $this->rules
        ];
    }

    public function getFormId(): string {
        return $this->formId;
    }
    public function setFormId(string $formId) {
        $this->formId = $formId;
    }


    public function getName(): string {
        return $this->name;
    }
    public function setName(string $name) {
        $this->name = $name;
    }

    public function getDisplayName(): string {
        return $this->displayName;
    }
    public function setDisplayName(string $name) {
        $this->displayName = ucfirst($name);
    }

    public function getOrder(): string {
        return $this->order;
    }
    public function setOrder(string $order) {
        $this->order = $order;
    }


    public function getAttributes(): string {
        return $this->attributes;
    }
    public function setAttributes(string $attributes) {
        $this->attributes = $attributes;
    }

  
    public function getRules(): ?string {
        return $this->rules;
    }
    public function setRules(?string $rules) {
        $this->rules = $rules;
    }

}
