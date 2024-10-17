<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;
use App\AppModules\Api\Domain\DtoBase;

class FormFieldDto extends DtoBase
{
    public ?string $id = null;
    public ?string $formId = null;
    public ?string $name = null;
    public ?string $order = null;
    public ?string $attributes = null;
    public ?string $rules = null;

    public function toArray(){
        return [
            'id' => $this->id,
            'form_id' => $this->formId = null,
            'name' => $this->name = null,
            'order' => $this->order = null,
            'attributes' => $this->attributes = null,
            'rules' => $this->rules = null
        ];
    }
}
