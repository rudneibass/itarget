<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormField;
use App\AppModules\Api\Domain\Entities\DtoBase;

class FormFieldDto extends DtoBase
{
    public ?int $id = null;
    public ?int $formId = null;
    public ?string $name = null;
    public ?array $attributes = null;
    public ?string $rules = null;
}
