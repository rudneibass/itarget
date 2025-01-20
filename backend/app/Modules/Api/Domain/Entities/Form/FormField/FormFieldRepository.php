<?php declare(strict_types=1);

namespace App\Modules\Api\Domain\Entities\Form\FormField;

use App\Modules\Api\Domain\Entities\Form\FormField\FormField;
use App\Modules\Api\Domain\Interfaces\Repository;

interface FormFieldRepository extends Repository {
    public function list(): array;
    public function create(FormField $formField): ?FormField;
    public function update(FormField $formField): bool;
    public function get(string $id): FormField;
    public function delete(string $id): int;
    public function findAllByParams(array $params = []): ?array;
}