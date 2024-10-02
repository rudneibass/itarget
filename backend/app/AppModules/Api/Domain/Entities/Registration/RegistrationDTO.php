<?php

namespace App\AppModules\Api\Domain\Entities\Registration;

class RegistrationDto {
    public string $name;
    public string $email;
    public string $cpf;
    public string $id;
    public string $eventId;
    public string $registrationId;
    public ?string $published;

    //string $name, string $eventId, string $email, string $cpf, ?string $id = null

    public function __construct(array $data) {
        $this->name = $data['name'];
        $this->email = $data['email'];
        $this->cpf = $data['cpf'];
        $this->id = $data['id'] ?? '';
        $this->eventId = $data['event_id'] ?? '';
        $this->registrationId = $data['registration_id'] ?? '';
        $this->published = $data['published'] ?? '';
    }
}
