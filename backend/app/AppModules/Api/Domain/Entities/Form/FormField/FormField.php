<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;

use App\AppModules\Api\Domain\Entities\EntityBase;

class FormField extends EntityBase {

    private string $formId;
    private string $name;
    private string $isActive;
    private array $attributes;
    
    private ?string $rules;
    private ?string $value;
    private ?array $options;
    private ?string $dataSource;

    private function __construct(FormFieldDto $dto) {
        $this->formId = $dto->formId;
        $this->name = $dto->name;
        $this->isActive = $dto->isActive;
        $this->attributes = $dto->attributes;

        $this->rules = $dto->rules ?? null;
        $this->value = $dto->value ?? null;
        $this->options = $dto->options ?? null;
        $this->dataSource = $dto->dataSource ?? null;

        if(isset($dto->id)){ $this->id = $dto->id; }
    }


    public function getFormId(): string {
        return $this->formId;
    }
    public function setFormId(string $formId): void {
        $this->formId = $formId;
    }



    public function getName(): string {
        return $this->name;
    }
    public function setName(string $name): void {
        $this->name = $name;
    }


    
    public function getIsActive(): string {
        return $this->isActive;
    }
    public function setIsActive(string $isActive): void {
        $this->isActive = $isActive;
    }



    public function getAttributes(): array {
        return $this->attributes;
    }
    public function setAttributes(array $attributes): void {
        $this->attributes = $attributes;
    }


    
    public function getRules(): ?string {
        return $this->rules;
    }
    public function setRules(?string $rules): void {
        $this->rules = $rules;
    }



    public function getValue(): ?string {
        return $this->value;
    }
    public function setValue(?string $value): void {
        $this->value = $value;
    }



    public function getOptions(): ?array {
        return $this->options;
    }
    public function setOptions(?array $options): void {
        $this->options = $options;
    }



    public function getDataSource(): ?string {
        return $this->dataSource;
    }
    public function setDataSource(?string $dataSource): void {
        $this->dataSource = $dataSource;
    }
}
