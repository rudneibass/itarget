<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;
use App\AppModules\Api\Domain\DtoBase;

class FormFieldDto extends DtoBase
{
    public ?string $id = null;
    public ?string $formId = null;
    public ?string $name = null;
    public ?array $attributes = null;
    public ?string $rules = null;
}
