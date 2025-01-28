<?php

namespace App\Modules\Form\Domain\UseCases\FormField\CreateFormField;

use App\Modules\Form\Domain\Entities\FormField\FormFieldDto;
use App\Modules\Form\Domain\Entities\FormField\FormField;

use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class CreateFormField {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FormFieldRepository(
            formFieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(array $request): ?array {
        return $this->repository->create(new FormField(new FormFieldDto($request)))->toArray();
    }
}