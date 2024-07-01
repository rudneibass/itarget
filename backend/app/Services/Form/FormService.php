<?php

declare(strict_types=1);
namespace App\Services\Form;

use App\Services\AbstractService;
use App\Repositories\FormRepository;

class FormService extends AbstractService
{
    protected $repository;

    public function __construct(){
        $this->repository = new FormRepository;
    }
}