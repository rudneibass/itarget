<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Interfaces\Repository;

interface FormRepositoryInterface extends Repository {
    public function get(string $id): Form;
    public function getFormFieldOptions(string $formFieldId): array;
    public function create(Form $form): ?Form;
    public function findAllByParams(array $params = []): ?array;

    #public function list(): array;
    #public function delete(string $id): int;
    #public function update(Form $form, string $id): int;
}