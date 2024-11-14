<?php

namespace App\AppModules\Form\Domain\UseCases\Form\PaginateForm;

use App\AppModules\Form\Domain\Entities\Form\FormRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateForm {

    private $repository;

    public function __construct(FormRepository $formRepository){
        $this->repository = $formRepository;
    }

    public function execute(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
        $forms = 
        array_map(function($form){
            return [
                'id' => $form->id,
                'name' => $form->name,
                'display_name' => $form->name,
                'attributes' => $form->attributes,
            ];
        }, $this->repository->findAllByParams($params));

        return 
        new LengthAwarePaginator($forms, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}