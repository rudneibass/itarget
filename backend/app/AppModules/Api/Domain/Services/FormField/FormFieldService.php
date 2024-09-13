<?php

namespace App\AppModules\Api\Domain\Services\FormField;

use App\AppModules\Api\Domain\Services\Service;
use App\AppModules\Api\Infra\Repositories\FormFieldRepository;

class FormFieldService extends Service
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormFieldRepository;
    }

    public function findAllByFormId(int $id){
        return $this->repository->findAllByParams(['form_id'=> $id]);
    }
}