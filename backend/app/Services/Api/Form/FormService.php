<?php

declare(strict_types=1);
namespace App\Services\Api\Form;

use App\Services\Api\AbstractService;
use App\Repositories\Api\FormRepository;

class FormService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormRepository;
    }
}