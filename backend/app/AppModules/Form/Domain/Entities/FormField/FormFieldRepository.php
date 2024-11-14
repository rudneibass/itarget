<?php declare(strict_types=1);

namespace App\AppModules\Form\Domain\Entities\FormField;

use App\AppModules\Form\Domain\Entities\FormField\FormField;
use App\AppModules\Form\Domain\Interfaces\Repository;

interface FormFieldRepository extends Repository {
    public function list(): array;
    public function create(FormField $formField): ?FormField;
    public function update(FormField $formField): bool;
    public function get(string $id): FormField;
    public function delete(string $id): int;
    public function findAllByParams(array $params = []): ?array;
}