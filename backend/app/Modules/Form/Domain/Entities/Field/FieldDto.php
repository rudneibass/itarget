<?php

namespace App\Modules\Form\Domain\Entities\Field;

use App\Modules\Form\Domain\Base\DtoBase;

class FieldDto extends DtoBase
{
    public ?string $id = null;
    public ?string $rules = null;
    public ?string $isActive = '1';
    public string $formId;
    public string $name;
    public string $order;
    public string $attributes;
}
