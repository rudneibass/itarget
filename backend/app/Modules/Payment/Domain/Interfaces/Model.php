<?php

namespace App\Modules\Payment\Domain\Interfaces;

interface Model
{
    public function find(int $id): ?array;
    public function create(array $data): array;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
    public function all(): array;
    public function where(array $conditions): array;
}