<?php

namespace App\AppModules\Api\Domain\Services\Form;

use App\AppModules\Api\Domain\Services\Service;
use App\AppModules\Api\Infra\Repositories\FormRepository;

class FormService extends Service
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