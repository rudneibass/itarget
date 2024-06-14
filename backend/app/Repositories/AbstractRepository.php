<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class AbstractRepository implements RepositoryInterface {

    protected Model $model;

    public function __construct(Model $model) {
        $this->model = $model;
    }
    
    public function list(): ?Collection {
        return $this->model::all();
    }

    public function paginate(int $itemsPerPage): ?LengthAwarePaginator {
        return $this->model::paginate($itemsPerPage);
    }

    public function get(int $id): ?Model {
        return $this->model::find($id);
    }

    public function create(array $request = []): ?Model {
        return $this->model::query()->create($request);
    }

    public function update(array $request, int $id): int {
        return $this->model::findOrFail($id)->update($request);
    }

    public function delete(int $id): int {
        return $this->model::findOrFail($id)->delete();
    }
}