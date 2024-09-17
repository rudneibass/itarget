<?php

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\EntityBase;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use Exception;

class Form extends EntityBase {
    const NAME_FORM_REGISTRATION = 'registration';
    
    private string $name;
    private string $isActive;
    private ?string $metadata;
    private ?string $attributes;
    private ?array $fields;

    public function __construct(FormDto $dto) {
        if(isset($dto->id)){ $this->setId($dto->id); }
        if($dto->fields){ $this->setFields($dto->fields); }
        $this->setName($dto->name);
        $this->setMetadata($dto->metadata);
        $this->setAttributes($dto->attributes);
        $this->setIsActive($dto->isActive);
    }

    public function toArray(){
        return [
            'id' => $this->id ?? null,
            'name' => $this->name,
            'metadata' => $this->metadata,
            'is_active' => $this->isActive
        ];
    }

    public function setName(string $name) {
        if(!isset($name) || empty($name)){ throw new Exception('Nome é obrigatório.'); }
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setMetadata(string $metadata) {
        $this->metadata = $metadata ?? '';
    }

    public function getMetadata(): string {
        return $this->metadata;
    }

    public function setAttributes(string $attributes) {
        $this->attributes = $attributes  ?? '';
    }

    public function getAttributes(): string {
        return $this->attributes;
    }

    public function setIsActive(string $isActive) {
        $this->isActive = $isActive;
    }

    public function getIsActive(): string {
        return $this->isActive;
    }

    public function setId(string $id) {
        if(isset($id) || !empty($id)){ $this->id = (string) $id; }
    }

    public function getId(): string {
       return $this->id;
    }

    public function setFields(array $fields) {
        $this->fields = $fields;
    }

    public function getFields() : ?array {
        return $this->fields;
    }
}