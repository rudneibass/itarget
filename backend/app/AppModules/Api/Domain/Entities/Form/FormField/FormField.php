<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;

use App\AppModules\Api\Domain\EntityBase;

class FormField extends EntityBase {

    private string $formId;
    private string $name;
    private array $attributes;
    private ?string $rules;

    public function __construct(FormFieldDto $dto) {
        $this->formId = $dto->formId;
        $this->name = $dto->name;
        $this->attributes = $dto->attributes;
        $this->rules = $dto->rules ?? null;

        if(isset($dto->id)){ $this->id = $dto->id; }
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


    public function getAttributes(): array {
        return $this->attributes;
    }
    public function setAttributes(array $attributes) {
        $this->attributes = $attributes;
    }

  
    public function getRules(): ?string {
        return $this->rules;
    }
    public function setRules(?string $rules) {
        $this->rules = $rules;
    }

}
