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
}