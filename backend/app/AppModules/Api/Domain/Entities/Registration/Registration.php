<?php

namespace App\AppModules\Api\Domain\Entities\Registration;

use App\AppModules\Api\Domain\Entities\EntityBase;
use Exception;

class Registration extends EntityBase {
    private string $eventId;
    private string $name;
    private string $email;
    private string $cpf;
    private ?string $registrationId;
    private ?string $published = '1';
     

    public function __construct(RegistrationDto $dto) {
        if(isset($dto->id)){ $this->setId($dto->id); }
        $this->setName($dto->name);
        $this->setEmail($dto->email);
        $this->setcpf($dto->cpf);
        $this->setEventId($dto->eventId);
        $this->setRegistrationId($dto->registrationId ?? '0');
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
        $this->published = '1';    
    }

    public function unpublished() {
        $this->published = '0';    
    }

    public function getPublished(): string {
        return $this->published;
    }
}