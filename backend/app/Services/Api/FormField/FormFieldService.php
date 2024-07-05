<?php

namespace App\Services\Api\FormField;

use App\Services\Api\AbstractService;
use App\Repositories\Api\FormFieldRepository;

class FormFieldService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormFieldRepository;
    }

    public function findAllByFormId(int $id){
        return $this->repository->findAllByParams(['form_id'=> $id]);
    }
}