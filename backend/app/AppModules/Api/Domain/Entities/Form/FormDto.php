<?php

namespace App\AppModules\Api\Domain\Entities\Form;

class FormDto {
    public string $id;
    public string $name;
    public string $metadata;
    public string $attributes;
    public string $isActive;
    public ?array $fields;
    
    public function __construct(array $data) {
        $this->id = $data['id'] ?? '';
        $this->isActive = $data['is_active'] ?? '1';
        $this->name = $data['name'];
        $this->metadata = $data['metadata'];
        $this->attributes= $data['attributes'];
        $this->fields = $data['fields'] ?? null;
    }
}
