<?php

namespace App\Modules\Api\Domain\UseCases\FormField\CreateFormField;

use App\Modules\Api\Domain\Entities\Form\FormField\FormField;
use App\Modules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\Modules\Api\Domain\Entities\Form\FormField\FormFieldRepository;

class CreateFormField {
    private $repository;

    public function __construct(FormFieldRepository $registrationRepository){
        $this->repository = $registrationRepository;
    }

    public function execute(FormFieldDto $dto): ?array {
        return $this->repository->create(new FormField($dto))->toArray();
    }
}