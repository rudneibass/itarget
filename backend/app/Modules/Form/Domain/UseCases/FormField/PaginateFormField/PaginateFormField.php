<?php

namespace App\Modules\Form\Domain\UseCases\FormField\PaginateFormField;

use App\Modules\Form\Domain\Repositories\FormField\Database\FormFieldRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateFormField {

    private $repository;

    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormFieldRepository($modelAdapter, $databaseAdapter);
    }


    public function execute(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
        $FormFields = 
        array_map(function($FormField){
            return [
                'id' => $FormField->id,
                'name' => $FormField->name,
                'display_name' => $FormField->name,
                'attributes' => $FormField->attributes,
            ];
        }, $this->repository->findAllByParams($params));

        return 
        new LengthAwarePaginator($FormFields, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}