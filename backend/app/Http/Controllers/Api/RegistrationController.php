<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\Registration\RegistrationCreateRequest;
use App\Services\Api\Registration\RegistrationService;

class RegistrationController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;
    
    public function __construct(){
        $this->service = new RegistrationService;
        $this->createRequest = new RegistrationCreateRequest;
    }

    public function findAllByParams(Request $request){
        return $this->executeAction(function() use ($request){
            return $this->service->findAllByParams($request->all());
        });
    }

    public function search(Request $request){
        return $this->executeAction(function() use ($request){
            return $this->service->search($request->all());
        });
    }
}
