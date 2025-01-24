<?php

namespace App\Modules\Form\Domain\Entities\Form;

use App\Modules\Form\Domain\Base\DtoBase;

class FormDto extends DtoBase {
    public ?int $id = null;
    public string $name;
    public ?string $attributes;
    public ?array $fields = null;
}
