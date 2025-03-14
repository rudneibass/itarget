<?php

namespace App\Modules\Form\Domain\Entities\Option;

use App\Modules\Form\Domain\Base\DtoBase;

class OptionDto extends DtoBase {
    public ?int $id = null;
    public ?int $value = null;
    public ?int $formFieldId = null;
    public ?string $name = null;
    public ?string $selected = null;
    public ?string $order = null;
    public ?string $isActive = null;
}