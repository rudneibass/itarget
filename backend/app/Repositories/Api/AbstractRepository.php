<?php

namespace App\Repositories\Api;

use App\Interfaces\RepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

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

    public function doc(){
        $table = $this->model->getTable();
        $columns = Schema::getColumnListing($table);
        $fields = [];
        foreach ($columns as $column) {
            $type = Schema::getColumnType($table, $column);
            $fields[$column] = $type;
        }
        return $fields;
    }

    public function getMetadata(int $id){
        return json_decode($this->model::findOrFail($id)->metadata, true);
    }

    public function setMetadata(array $request){
        $record = $this->model::findOrFail($request['id']);       
        $existingMetadata = json_decode($record->metadata, true);
        $newMetadata = array_merge($existingMetadata, $request['metadata']);
        $record->metadata = json_encode($newMetadata);
        $record->save();
        return $record;
    }
}