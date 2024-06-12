<?php

namespace App\Http\Controllers;

use App\Services\Registration\RegistrationService;

class RegistrationController extends AbstractController
{
    protected $service;
    
    public function __construct(){
        $this->service = new RegistrationService;
    }
}
