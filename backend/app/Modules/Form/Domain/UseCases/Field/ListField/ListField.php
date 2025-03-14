<?php

namespace App\Modules\Form\Domain\UseCases\Field\ListField;

use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;

class ListField {
    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FormFieldRepository(
            formFieldModelAdapter: $modelAdapter, 
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
                'data_source' => $item->dataSource,
                'order' => $item->order,
            ];
        }, $this->repository->list($params));
    }
}