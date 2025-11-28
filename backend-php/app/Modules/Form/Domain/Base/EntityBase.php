<?php

namespace App\Modules\Form\Domain\Base;

use Exception;

abstract class EntityBase {
    
    public function __get($property) {
        $method = 'get' . ucfirst($property);
        if (method_exists($this, $method)) { return $this->$method(); }
        throw new Exception(get_class($this)." não possui a propriedade '$property'.");
    }

    public function __set($property, $value) {
        $method = 'set' . ucfirst($property);
        if (method_exists($this, $method)) {
            $this->$method($value);
        } else {
            throw new Exception(get_class($this)." não possui o método '$property' ou não pode ser acessado.");
        }
    }
}