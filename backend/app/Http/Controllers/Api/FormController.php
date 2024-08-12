<?php

namespace App\Http\Controllers\Api;

use App\Services\Api\Form\FormService;

class FormController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;

    public function __construct(){
        $this->service = new FormService;
    }
    
    public function get($id){
        return $this->executeAction(function() use ($id){
            return $this->service->getFormWithFields($id);
        });
    }

    public function getByName(string $name){
        return $this->executeAction(function() use ($name){
            return $this->service->getByName($name);
        });
    }
}