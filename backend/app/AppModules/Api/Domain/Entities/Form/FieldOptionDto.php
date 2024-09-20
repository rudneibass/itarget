<?php

namespace App\AppModules\Api\Domain\Entities\Form;

class FieldOptionDto
{
    public string $value;
    public string $label;
    public ?string $selected;

    public function __construct(array $data) {
        $this->value = $data['value'];
        $this->label = $data['label'];
        $this->selected = $data['selected'] ?? '';
    }

    public function toArray(): array {
        return [
            'value' => $this->value,
            'label' => $this->label,
            'selected' => $this->selected
        ];
    }
}
