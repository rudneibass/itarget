<?php

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\DtoBase;

class FormDto extends DtoBase {
    public ?int $id = null;
    public ?string $name = null;
    public ?array $attributes = null;
    public ?array $fields = null;

    //Remover esse atributo e suas referencias em todo o sistema
    //pois o mesmo foi substituipo por public ?array $attributes = null;
    public ?string $metadata = null;
}
