<?php
declare(strict_types=1);

namespace App\Services\Api\Form;
use App\Services\Api\AbstractService;
use App\Repositories\Api\FormRepository;

class FormService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormRepository;
    }

    public function getFormWithFields(int $formId){
        $data_composer_object = new DCOFormFieldsByFormId($formId);
        return $data_composer_object->compositeObject;
    }

    public function getByName(string $name){
        $data_composer_object = new DCOFormFieldsByFormName($name);
        return $data_composer_object->compositeObject;
    }
}