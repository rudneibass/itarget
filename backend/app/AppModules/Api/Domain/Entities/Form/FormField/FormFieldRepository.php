<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Entities\Form\FormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormField;
use App\AppModules\Api\Domain\Interfaces\Repository;

interface FormFieldRepository extends Repository {
    public function create(FormField $formField): ?FormField;
    public function list(): array;
    public function get(string $id): FormField;
    public function delete(string $id): int;
    public function update(FormField $formField, string $id): bool;
    public function findAllByParams(array $params = []): ?array;
}