<?php

namespace App\Http\Controllers;

use App\Http\Requests\Registration\RegistrationCreateRequest;
use App\Services\Registration\RegistrationService;

class RegistrationController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;
    
    public function __construct(){
        $this->service = new RegistrationService;
        $this->createRequest = new RegistrationCreateRequest;
    }
}
