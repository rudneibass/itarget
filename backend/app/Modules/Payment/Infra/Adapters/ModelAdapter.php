<?php

namespace App\Modules\Payment\Infra\Adapters;

use App\Modules\Payment\Domain\Interfaces\Model as ModelInterface;
use Illuminate\Database\Eloquent\Model;

class ModelAdapter implements ModelInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function find(string $id): ?array
    {
        $record = $this->model->find($id);
        return $record ? $record->toArray() : null;
    }

    public function create(array $data): array
    {
        return $this->model->create($data)->toArray();
    }

    public function update(string $id, array $data): array
    {
        $record = $this->model->find($id);
        return $record->update($data) ? $this->model->find($id)->toArray() : [];
    }

    public function delete(string $id): bool
    {
        $record = $this->model->find($id);
        return $record ? $record->delete() : false;
    }

    public function all(): array
    {
        return $this->model->all()->toArray();
    }

    public function where(array $conditions): array
    {

        $query = $this->model->query();

        foreach ($conditions as $column => $value) {
            $query->where($column, $value);
        }
        
        return $query->get()->toArray();
      
    }
}
