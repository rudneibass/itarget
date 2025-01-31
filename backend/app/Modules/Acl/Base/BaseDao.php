<?php

namespace App\Modules\Acl\Base;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

abstract class BaseDao  {

    protected Model $model;

    public function __construct(Model $model) {
        $this->model = $model;
    }
    
    public function getAll(): ?array {
        return $this->model::all()->toArray();
    }

    public function paginate(int $itemsPerPage): ?LengthAwarePaginator {
        return $this->model::paginate($itemsPerPage);
    }

    public function getById(int $id): ?Model {
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

    public function getDoc(){
        $table = $this->model->getTable();
        $columns = Schema::getColumnListing($table);
        $fields = [];
        foreach ($columns as $column) {
            $type = Schema::getColumnType($table, $column);
            $fields[$column] = $type;
        }
        return $fields;
    }
}