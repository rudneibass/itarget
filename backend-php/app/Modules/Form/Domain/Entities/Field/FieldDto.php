<?php

namespace App\Modules\Form\Domain\Entities\Field;

use App\Modules\Form\Domain\Base\DtoBase;

class FieldDto extends DtoBase
{
    public ?string $id;
    public ?string $rules;
    public ?int $isActive;
    public ?string $module;
    public ?string $entity;
    public ?array $options;
    public string $formId;
    public string $name;
    public string $order;
    public string $attributes;
}
