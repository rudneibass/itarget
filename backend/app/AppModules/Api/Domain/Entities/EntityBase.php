<?php

namespace App\AppModules\Api\Domain\Entities;

use Exception;

class EntityBase {
    protected ?string $id;

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