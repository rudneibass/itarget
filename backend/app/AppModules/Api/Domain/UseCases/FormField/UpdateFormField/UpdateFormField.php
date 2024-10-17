<?php

namespace App\AppModules\Api\Domain\UseCases\FormField\UpdateFormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormField;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldRepository;

class UpdateFormField {
    private $repository;

    public function __construct(FormFieldRepository $registrationRepository){
        $this->repository = $registrationRepository;
    }

    public function execute(FormFieldDto $dto, $id): int {
        return $this->repository->update(new FormField($dto),$id);
    }
}