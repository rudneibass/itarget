<?php

namespace App\Http\Controllers;

use App\Services\Form\FormService;

class FormController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;

    public function __construct(){
        $this->service = new FormService;
    }
}