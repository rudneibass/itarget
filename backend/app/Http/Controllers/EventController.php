<?php

namespace App\Http\Controllers;

use App\Services\Event\EventService;
use Illuminate\Http\Request;

class EventController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;

    public function __construct(){
        $this->service = new EventService;
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