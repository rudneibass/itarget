<?php

namespace App\Modules\Event\Domain\Entities\Registration;

use App\Modules\Event\Domain\Base\EntityBase;
use Exception;

class Registration extends EntityBase {
    private string $eventId;
    private string $name;
    private string $email;
    private string $cpf;
    private ?string $registrationId;
    private ?bool $published;

    public function __construct(RegistrationDto $dto) {
        $this->name = $dto->name;
        $this->email = $dto->email;
        $this->cpf = $dto->cpf;
        $this->eventId = $dto->eventId;

        $this->id = $dto->id ?? null; 
        $this->published = $dto->published ?? false;
        $this->registrationId = $dto->registrationId ?? '0';
    }

    public function toArray(){
        return [
            'id' => $this->id ?? null,
            'name' => $this->name,
            'display_name' => $this->displayName,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'event_id' => $this->eventId,
            'registration_id' => $this->registrationId,
            'published' => $this->published
        ];
    }

    public function setEventId(string $eventId) {
        if(!isset($eventId) || empty($eventId)){ throw new Exception('Id do evento é obrigatório.'); }
        $this->eventId = (int) $eventId;
    }

    public function getEventId(): string {
        return $this->eventId;
    }

    public function setName(string $name) {
        if(!isset($name) || empty($name)){ throw new Exception('Nome é obrigatório.'); }
        $this->name = $name;
        $this->displayName = $name;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setEmail(string $email) {
        if(!isset($email) || empty($email)) { throw new Exception('Email é obrigatório.'); }
        $this->email = $email;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function setCpf(string $cpf){
        if(!isset($cpf) || empty($cpf)) { throw new Exception('Cpf é obrigatório.'); }
        $this->cpf = $cpf;
    }
    
    public function getCpf(): string {
        return $this->cpf;
    }

    public function setRegistrationId(string $registrationId) {
        $this->registrationId = (string) $registrationId;
    }

    public function getRegistrationId(): string {
        return $this->registrationId;
    }

    public function published() {
        $this->published = true;   
    }

    public function unpublished() {
        $this->published = false;    
    }

    public function getPublished(): string {
        return $this->published;
    }
}