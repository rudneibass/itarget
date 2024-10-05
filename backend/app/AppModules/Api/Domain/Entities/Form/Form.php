<?php

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\EntityBase;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use Exception;

class Form extends EntityBase {
    const NAME_FORM_REGISTRATION = 'registration';
    
    private string $name;
    private ?array $attributes;
    private ?array $fields;

    public function __construct(FormDto $dto) {
        if(isset($dto->id)){ $this->setId($dto->id); }
        if($dto->fields){ $this->setFields($dto->fields); }
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

    public function setAttributes(array $attributes) {
        $this->attributes = $attributes;
    }

    public function getAttributes(): array {
        return $this->attributes;
    }
    

    public function setFields(array $fields) {
        $this->fields = $fields;
    }

    public function getFields() : ?array {
        return $this->fields;
    }
}