<?php

namespace App\Modules\Form\Domain\UseCases\Form\CreateForm;

use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Entities\Form\Form;

use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class CreateForm {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(array $request): ?array {
        return $this->repository->create(new Form(new FormDto($request)))->toArray();
    }
}