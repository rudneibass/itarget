<?php
namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class AbstractService {

    protected $repository;
    
    public function get(int $id): ?Model {
        return $this->repository->get($id);
    }
    
    public function list(): Collection {
        return $this->repository->list();
    }

    public function create(array $request): ?array {
        return [$this->repository->create($request)];
    }

    public function update(array $request, int $id): int {
        return $this->repository->update($request, $id);
    }

    public function delete(int $id): int {
        return $this->repository->delete($id);
    }
}