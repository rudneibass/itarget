<?php

namespace App\Modules\Form\Domain\Entities\Option;

use App\Modules\Form\Domain\Base\EntityBase;

use Exception;

class Option extends EntityBase {

    private string $formFieldId;
    private string $name;
    private string $value;
    private ?string $order;
    private ?string $selected;

    public function __construct(OptionDto $dto)
    {
        $this->formFieldId = $dto->formFieldId;
        $this->name = $dto->name;
        $this->value = $dto->value;
        $this->order = $dto->order ?? '1';

        if(isset($dto->id)){ $this->setId($dto->id); }
        if(isset($dto->selected)){ $this->setSelected($dto->selected); }
    }

    public function setName(string $name) {
        if(!isset($name) || empty($name)){ throw new Exception('$name é obrigatório.'); }
        $this->name = $name;
    }
    public function getName(): string {
        return $this->name;
    }


    public function setValue(string $value) {
        if(!isset($value) || empty($value)){ throw new Exception('$value é obrigatório.'); }
        $this->value = $value;
    }
    public function getValue(): string {
        return $this->value;
    }


    public function setOrder(string $order) {
        $this->order = $order || '1';
    }
    public function getOrder(): string {
        return $this->order;
    }


    public function setFormFieldId(string $formFieldId) {
        if(!isset($formFieldId) || empty($formFieldId)){ throw new Exception('$formFieldId é obrigatório.'); }
        $this->formFieldId = $formFieldId;
    }
    public function getFormFieldId(): string {
        return $this->formFieldId;
    }


    public function setSelected(string $selected) {
        $this->selected = $selected;
    }
    public function getSelected(): string {
        return $this->selected;
    }
}