<?php

namespace App\Modules\Form\Domain\Entities\FormField;

use App\Modules\Form\Domain\Base\DtoBase;

class FormFieldDto extends DtoBase
{
    public ?string $id = null;
    public ?string $formId = null;
    public ?string $name = null;
    public ?string $order = null;
    public ?string $attributes = null;
    public ?string $dataSource = null;
    public ?string $rules = null;
    public ?string $isActive = null;
}
