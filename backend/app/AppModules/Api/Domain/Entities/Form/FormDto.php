<?php

namespace App\AppModules\Api\Domain\Entities\Form;

class FormDto {
    public string $id;
    public string $name;
    public array $attributes;
    public ?array $fields;
    
    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->name = $data['name'];
        $this->attributes= $data['attributes'] ?? [];
        $this->fields = $data['fields'] ?? null;
    }
}
