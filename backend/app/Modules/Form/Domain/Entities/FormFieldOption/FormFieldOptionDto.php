<?php

namespace App\Modules\Form\Domain\Entities\FormFieldOption;

use App\Modules\Api\Domain\DtoBase;

class FormFieldOptionDto extends DtoBase {
    public ?int $id = null;
    public ?int $value = null;
    public ?int $formFieldId = null;
    public ?string $name = null;
    public ?string $selected = null;
    public ?string $order = null;
    public ?string $isActive = null;
}