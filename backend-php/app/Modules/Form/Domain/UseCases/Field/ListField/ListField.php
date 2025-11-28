<?php

namespace App\Modules\Form\Domain\UseCases\Field\ListField;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;

class ListField {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FieldRepository(
            fieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(array $params = []): array {
        return array_map(function($item){
            return [
                'id' => $item->id,
                'form_id' => $item->formId,
                'name' => $item->name,
                'rules' => $item->rules,
                'is_active' => $item->isActive,
                'attributes' => $item->attributes,
                'order' => $item->order,
            ];
        }, $this->repository->list($params));
    }
}