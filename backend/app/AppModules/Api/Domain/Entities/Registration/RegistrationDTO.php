<?php

namespace App\AppModules\Api\Domain\Entities\Registration;

class RegistrationDTO {
    public string $id;
    public string $eventId;
    public string $name;
    public string $email;
    public string $cpf;
    
    //string $name, string $eventId, string $email, string $cpf, ?string $id = null

    public function __construct(array $data) {
        $this->eventId = $data['event_id'];
        $this->name = $data['name'];
        $this->email = $data['email'];
        $this->cpf = $data['cpf'];
        $this->id = $data['id'] ?? '';
    }
}
