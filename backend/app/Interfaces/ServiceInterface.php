<?php

declare(strict_types=1);

namespace App\Interfaces;

interface ServiceInterface {
    public function list(): ?array;
    public function paginate(int $itemsPerPage): ?array;
    public function get(int $id): ?array;
    public function create(array $request): ?array;
    public function update(array $request, int $id):int;
    public function delete(int $id):int;
}