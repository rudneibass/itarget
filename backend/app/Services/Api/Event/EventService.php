<?php

declare(strict_types=1);
namespace App\Services\Api\Event;

use App\Services\Api\AbstractService;
use App\Repositories\Api\EventRepository;

class EventService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new EventRepository;
    }

    public function findAllByParams(array $params){
        return $this->repository->findAllByParams($params);
    }

    public function search(array $params){
        return $this->repository->search($params);
    }
}