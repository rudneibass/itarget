<?php
namespace App\Services\Api;

use App\Interfaces\ServiceInterface;

abstract class AbstractService implements ServiceInterface {

    protected $repository;
    
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

    public function getById(int $id): ?object {
        return $this->repository->getById($id);
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

    public function doc(): array {
        return $this->repository->doc();
    }

    public function getMetadata(int $id): array {
        return $this->repository->getMetadata($id);
    }

    public function setMetadata(array $request): array {
        return $this->repository->setMetadata($request);
    }
    
}