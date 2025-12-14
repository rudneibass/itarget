<?php

namespace App\Modules\Form\Domain\Entities\Field;

use App\Modules\Form\Domain\Base\EntityBase;

class Field extends EntityBase {
    const FORM_NAME = 'form-field';
    
    private string $formId;
    private string $name;
    private string $attributes;
    private ?string $id;
    private ?string $order;
    private ?string $rules;
    private ?int $isActive;
    private ?string $module;
    private ?string $entity;
    private ?array $options;
    private ?string $displayName;

    public function __construct(FieldDto $dto) {
        $this->formId = $dto->formId;
        $this->name = $dto->name;
        $this->attributes = $dto->attributes;
        
        $this->id = $dto->id ?? null; 
        $this->rules = $dto->rules ?? null;
        $this->order = $dto->order ?? null;
        $this->isActive = $dto->isActive ?? 1;

        $this->module = $dto->module ?? null;
        $this->entity = $dto->entity ?? null;
        $this->options = $dto->options ?? null;
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
            'module' => $this->module,
            'entity' => $this->entity,
            'options' => $this->options
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


    public function setId(string $id) {
        $this->id = (string) $id;
    }

    public function getId(): ?string {
        return $this->id;
    }

    public function setIsActive(string $isActive) {
        $this->isActive = $isActive;
    }

    public function getIsActive(): ?string {
      return $this->isActive;
    }

    public function setOptions(array $options) {
        $this->options = $options;
    }

    public function getOptions(): ?array {
        return $this->options;
    }

    public function setModule(string $module) {
        $this->module = $module;
    }

    public function getModule(): ?string {
        return $this->module;
    }

    public function setEntity(string $entity) {
        $this->entity = $entity;
    }
    public function getEntity(): ?string {
        return $this->entity;
    }
}
