<?php
namespace App\Services;

use App\Interfaces\ServiceInterface;

abstract class AbstractService implements ServiceInterface {

    protected $repository;
    
    public function get(int $id): ?array {
        return [$this->repository->get($id)];
    }
    
    public function list(): ?array {
        $list = [];
        foreach($this->repository->list() as $item){
            $list[] = $item;
        }
        return $list;
    }

    public function paginate(int $itemsPerPage = 10): ?array {
        return [$this->repository->paginate($itemsPerPage)];
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