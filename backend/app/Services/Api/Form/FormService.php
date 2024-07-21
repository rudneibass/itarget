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
        $database_object_composer = new DOCFormFieldsByFormId($formId);
        return $database_object_composer->compositeObject;
    }

    public function findAllByName(string $name){
        $database_object_composer = new DOCFormFieldsByFormName($name);
        return $database_object_composer->compositeObject;
    }
}