<?php

namespace App\Modules\Form\Domain\Entities\Form;

use App\Modules\Form\Domain\DtoBase;

class FormDto extends DtoBase {
    public ?int $id = null;
    public ?string $name = null;
    public ?string $attributes = null;
    public ?array $fields = null;
}
