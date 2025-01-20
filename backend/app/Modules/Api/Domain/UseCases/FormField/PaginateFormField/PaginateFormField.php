<?php

namespace App\Modules\Api\Domain\UseCases\FormField\PaginateFormField;

use App\Modules\Api\Domain\entities\Form\FormField\FormFieldRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateFormField {

    private $repository;

    public function __construct(FormFieldRepository $FormFieldRepository){
        $this->repository = $FormFieldRepository;
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
                'order' => $formField->order,
                'display_name' => $formField->displayName,
                'attributes' => $formField->attributes
            ];
        }, $this->repository->findAllByParams($params));

        return 
        new LengthAwarePaginator($formFields, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}