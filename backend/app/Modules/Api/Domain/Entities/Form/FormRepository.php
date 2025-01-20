<?php declare(strict_types=1);

namespace App\Modules\Api\Domain\Entities\Form;

use App\Modules\Api\Domain\Entities\Form\Form;
use App\Modules\Api\Domain\Interfaces\Repository;

interface FormRepository extends Repository {
    public function get(string $id): Form;
    public function getFormFieldOptions(string $formFieldId): array;
    public function create(Form $form): ?Form;
    public function findAllByParams(array $params = []): ?array;
    public function update(Form $formField): bool;
}