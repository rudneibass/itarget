<?php

namespace App\AppModules\Api\Domain\Entities\Registration;

use Exception;

class Registration {
    private string $eventId;
    private string $name;
    private string $email;
    private string $cpf;
    private ?string $id;
     

    public function __construct(RegistrationDTO $dto) {
        if(isset($dto->id)){ $this->setId($dto->id); }
        $this->setName($dto->name);
        $this->setEmail($dto->email);
        $this->setcpf($dto->cpf);
        $this->setEventId($dto->eventId);
    }

    public function toArray(){
        return [
            'id' => $this->id ?? null,
            'name' => $this->name,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'event_id' => $this->eventId
        ];
    }

    public function setEventId(string $eventId) {
        if(!isset($eventId) || empty($eventId)){ throw new Exception('Id do evento é obrigatório.'); }
        $this->eventId = $eventId;
    }

    public function getEventId(): string {
        return $this->eventId;
    }

    public function setName(string $name) {
        if(!isset($name) || empty($name)){ throw new Exception('Nome é obrigatório.'); }
        $this->name = $name;
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

    public function setId(string $id) {
        if(isset($id) || !empty($id)){ $this->id = (string) $id; }
    }

    public function getId(): string {
       return $this->id;
    }

    public function __get($property) {
        $method = 'get' . ucfirst($property);
        if (method_exists($this, $method)) { return $this->$method(); }
        throw new Exception("Propriedade '$property' não existe.");
    }

    public function __set($property, $value) {
        $method = 'set' . ucfirst($property);
        if (method_exists($this, $method)) {
            $this->$method($value);
        } else {
            throw new Exception("Propriedade ou método '$property' não existe ou não pode ser definido.");
        }
    }
}