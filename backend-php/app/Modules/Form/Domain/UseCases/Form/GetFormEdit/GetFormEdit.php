<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormEdit;

use App\Modules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;

use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;

class GetFormEdit {
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private Database $databaseAdapter, 
        private ListService $listServiceAdapter
    ) {
        $this->repository = new FormRepository($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(array $request){
        
        $useCase = new GetFormCreate($this->modelAdapter, $this->databaseAdapter, $this->listServiceAdapter);
        $form = $useCase->execute();
        $entity = $this->repository->getById($request['id']);
        $record = $entity->toArray();

        $form['fields'] = array_map(function ($field) use ($record) {
            if (isset($record[$field['name']]) && is_array($record[$field['name']])) {
                $record[$field['name']] = json_encode($record[$field['name']]);
            }

            $field = $this->textField($field, $record);
            $field = $this->textareaField($field, $record);
            $field = $this->checkboxField($field, $record);
            $field = $this->selectField($field, $record);
            $field = $this->searchableField($field, $record);
    
            return $field;
        }, $form['fields']);
    
        return $form;
    }

    private function textField(array $field, array $record): array {
        if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'text') {
            if (isset($record[$field['name']]) && !empty($record[$field['name']])) {
                $field['attributes']['value'] = $record[$field['name']];
            }
        }
        return $field;
    }

    private function textareaField(array $field, array $record): array {
        if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'textarea') {
            if (isset($record[$field['name']]) && !empty($record[$field['name']])) {
                $field['attributes']['value'] = $record[$field['name']];
            }
        }
        return $field;
    }

    private function checkboxField(array $field, array $record): array {
        if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'checkbox') {
            if (isset($record[$field['name']]) && $record[$field['name']] === '1') {
                $field['attributes']['checked'] = 'checked';
            }
        }
        return $field;
    }

    private function selectField(array $field, array $record): array {
        if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
            if (isset($record[$field['name']]) && !empty($record[$field['name']])) {
                $field['attributes']['value'] = $record[$field['name']];
            }
        }
        return $field;
    }

    private function searchableField(array $field, array $record): array {
        if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'searchable') {
            if (isset($record[$field['name']]) && !empty($record[$field['name']])) {
                $field['attributes']['value'] = $record[$field['name']];
                $field['attributes']['data_value_description'] = '';
                if (isset($field['attributes']['module']) && isset($field['attributes']['entity'])) {
                    $list = $this->listServiceAdapter->getList(
                        $field['attributes']['module'], 
                        $field['attributes']['entity'],
                        ['id' => $record[$field['name']]]
                    );
                    $field['attributes']['data_value_description'] = $list[0]['id'] ?? '';
                }
            }
        }
        return $field;
    }
}