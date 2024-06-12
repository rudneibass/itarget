<?php

declare(strict_types=1);

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface RepositoryInterface {
    public function list():Collection;
    public function get(int $id): ?Model;
    public function create(array $request): ?Model;
    public function update(array $request, int $id):int;
    public function delete(int $id):int;
}