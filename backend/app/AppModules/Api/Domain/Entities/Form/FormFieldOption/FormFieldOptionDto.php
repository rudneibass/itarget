<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormFieldOption;
use App\AppModules\Api\Domain\Entities\DtoBase;

class FormFieldOptionDto extends DtoBase {
    public ?int $id = null;
    public ?int $value = null;
    public ?int $formFieldId = null;
    public ?string $name = null;
    public ?string $selected = null;
    public ?string $order = null;
    public ?string $isActive = null;
}