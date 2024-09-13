<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Services\Event;

use App\AppModules\Api\Domain\Services\Service;
use App\AppModules\Api\Infra\Repositories\EventRepository;

class EventService extends Service
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