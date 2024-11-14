<?php

namespace App\AppModules\Form\Domain\UseCases\FormField\CreateFormField;

use App\AppModules\Form\Domain\Entities\FormField\FormField;
use App\AppModules\Form\Domain\Entities\FormField\FormFieldDto;
use App\AppModules\Form\Domain\Entities\FormField\FormFieldRepository;

class CreateFormField {
    private $repository;

    public function __construct(FormFieldRepository $registrationRepository){
        $this->repository = $registrationRepository;
    }

    public function execute(FormFieldDto $dto): ?array {
        return $this->repository->create(new FormField($dto))->toArray();
    }
}