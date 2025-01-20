<?php

namespace App\Modules\Api\Domain\Entities\Form;

use App\Modules\Api\Domain\DtoBase;

class FormDto extends DtoBase {
    public ?int $id = null;
    public ?string $name = null;
    public ?string $attributes = null;
    public ?array $fields = null;
}
