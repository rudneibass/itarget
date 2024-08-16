<?php

namespace App\Services\Api\Form;
use App\Services\Api\AbstractService;
use App\Repositories\Api\FormRepository;

class FormService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormRepository;
    }

    public function getByName(string $name){
        $data_composer_object = new DCOFormFieldsByFormName($name);
        return $data_composer_object->compositeObject;
    }
}