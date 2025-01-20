<?php

namespace App\Modules\Form\Domain\UseCases\FormField\CreateFormField;

use App\Modules\Form\Domain\Entities\FormField\FormField;
use App\Modules\Form\Domain\Entities\FormField\FormFieldDto;
use App\Modules\Form\Domain\Entities\FormField\FormFieldRepository;

class CreateFormField {
    private $repository;

    public function __construct(FormFieldRepository $registrationRepository){
        $this->repository = $registrationRepository;
    }

    public function execute(FormFieldDto $dto): ?array {
        return $this->repository->create(new FormField($dto))->toArray();
    }
}