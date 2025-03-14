<?php

namespace App\Modules\Form\Domain\UseCases\Field\PaginateField;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateField {

    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = 
        new FieldRepository(
            formFieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }


    public function execute(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
        $formFields = 
        array_map(function($formField){
            return [
                'id' => $formField->id,
                'form_id' => $formField->formId,
                'name' => $formField->name,
                'rules' => $formField->rules,
                'is_active' => $formField->isActive,
                'attributes' => $formField->attributes,
                'data_source' => $formField->dataSource,
                'order' => $formField->order,
            ];
        }, $this->repository->findAllByParams($params));

        return 
        new LengthAwarePaginator($formFields, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}