<?php

declare(strict_types=1);
namespace App\Services\Event;

use App\Services\AbstractService;
use App\Repositories\EventRepository;

class EventService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new EventRepository;
    }
}