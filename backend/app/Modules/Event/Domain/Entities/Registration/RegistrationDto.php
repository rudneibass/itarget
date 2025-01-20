<?php

namespace App\Modules\Event\Domain\Entities\Registration;
use App\Modules\Event\Domain\DtoBase;

class RegistrationDto extends DtoBase {
    public ?string $id = null;
    public ?string $eventId = null;
    public ?string $registrationId = null;
    public ?string $name = null;
    public ?string $email = null;
    public ?string $cpf = null;
    public ?bool $published = null;
}
