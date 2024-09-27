<?php

namespace App\AppModules\Api\Domain\Entities;

use Exception;

abstract class EntityBase {
    protected ?string $id;
    protected ?string $tenatId;
    protected ?string $isActive;

    public function setId(string $id) {
        $this->id = (string) $id; 
    }

    public function getId(): string {
       return $this->id;
    }

    public function setTenatId(string $tenatId) {
         $this->tenatId = (string) $tenatId; 
    }

    public function getTenatId(): string {
       return $this->tenatId;
    }

    public function activate(){
        $this->isActive = '1';
    }
    
    public function deactivate(){
        $this->isActive = '0';
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