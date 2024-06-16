<?php

namespace App\Http\Controllers;

use App\Services\Event\EventService;

class EventController extends AbstractController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;

    public function __construct(){
        $this->service = new EventService;
    }
}