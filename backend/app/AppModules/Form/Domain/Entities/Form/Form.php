<?php

namespace App\AppModules\Form\Domain\Entities\Form;

use App\AppModules\Form\Domain\EntityBase;
use App\AppModules\Form\Domain\Entities\Form\FormDto;
use Exception;

class Form extends EntityBase {
    const NAME_FORM_REGISTRATION = 'registration';
    const NAME_FORM_FORM = 'form';
    const NAME_FORM_FIELD = 'form-field';
    
    private string $name;
    private ?string $attributes;
    private ?array $fields;

    public function __construct(FormDto $dto) {
        if(isset($dto->id)){ $this->setId($dto->id); }
        $this->setFields($dto->fields ?? []);
        $this->setName($dto->name);
        $this->setAttributes($dto->attributes);
    }

    public function toArray(){
        return [
            'id' => $this->id ?? null,
            'name' => $this->name,
            'attributes' => $this->attributes
        ];
    }

    public function setName(string $name) {
        if(!isset($name) || empty($name)){ throw new Exception('Nome é obrigatório.'); }
        $this->name = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getDisplayName(): string {
        return $this->displayName;
    }
    public function setDisplayName(string $name) {
        $this->displayName = ucfirst($name);
    }
    
    public function setAttributes(string $attributes) {
        $this->attributes = $attributes;
    }

    public function getAttributes(): string {
        return $this->attributes;
    }
    

    public function setFields(array $fields) {
        $this->fields = $fields;
    }

    public function getFields() : ?array {
        return $this->fields;
    }
}