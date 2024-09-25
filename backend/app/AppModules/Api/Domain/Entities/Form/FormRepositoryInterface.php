<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\Form;

interface FormRepositoryInterface {
    public function get(string $id): Form;
    public function getFormFieldOptions(string $formFieldId): array;
}