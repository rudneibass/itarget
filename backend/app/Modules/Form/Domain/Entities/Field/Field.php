<?php

namespace App\Modules\Form\Domain\Entities\Field;

use App\Modules\Form\Domain\Base\EntityBase;

class Field extends EntityBase {
    const FORM_NAME = 'form-field';
    
    private string $formId;
    private string $name;
    private string $attributes;
    private ?string $order = 'Não ordenado';
    private ?string $rules;
    private ?string $dataSource = null;

    public function __construct(FieldDto $dto) {
        $this->formId = $dto->formId;
        $this->name = $dto->name;
        $this->attributes = $dto->attributes;
        $this->rules = $dto->rules ?? null;

        if(isset($dto->id)){ $this->id = $dto->id; }
        if(isset($dto->order)){ $this->order = $dto->order; }
        if(isset($dto->isActive)){ $this->isActive = $dto->isActive; }
        if(isset($dto->dataSource)){ $this->dataSource = $dto->dataSource; }
    }
    
    public function toArray() {
        return [
            'id' => isset($this->id) ? $this->id : null,
            'order' => isset($this->order) ? $this->order : null,
            'form_id' => $this->formId,
            'name' => $this->name,
            'display_name' => $this->displayName,
            'attributes' => $this->attributes,
            'rules' => $this->rules,
            'is_active' => $this->isActive,
            'data_source' => $this->dataSource ?? null,
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


    public function getDataSource(): ?string {
        return $this->dataSource;
    }
    public function setDataSource(string $dataSource) {
        $this->dataSource = $dataSource;
    }
}
