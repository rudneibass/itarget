<?php

namespace App\Http\Controllers\Api;

use App\Services\Api\FormField\FormFieldService;

class FormFieldController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;

    public function __construct(){
        $this->service = new FormFieldService;
    }

    public function findAllByFormId(int $id){
        return $this->executeAction(function() use ($id){
            return $this->service->findAllByFormId($id);
        });
    }
}