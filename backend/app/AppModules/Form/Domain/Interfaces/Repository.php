<?php
namespace App\AppModules\Form\Domain\Interfaces;

interface Repository {
    public function list(): array;
    public function get(string $id): object;
    public function delete(string $id): int;
    public function findAllByParams(array $params = []): ?array;
}