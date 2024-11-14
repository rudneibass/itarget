<?php

namespace App\AppModules\Form\Domain\Entities\Form;

use App\AppModules\Form\Domain\DtoBase;

class FormDto extends DtoBase {
    public ?int $id = null;
    public ?string $name = null;
    public ?string $attributes = null;
    public ?array $fields = null;
}
