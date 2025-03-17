<?php

namespace App\Modules\Event\Domain\Entities\Event;

use App\Modules\Event\Domain\Base\DtoBase;

class EventDto extends DtoBase {
    public ?string $id = null;
    public ?string $eventId = null;
    public ?string $registrationId = null;
    public ?string $name = null;
    public ?string $email = null;
    public ?string $cpf = null;
    public ?bool $published = null;
}
