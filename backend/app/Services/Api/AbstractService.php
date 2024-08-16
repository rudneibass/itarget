<?php
namespace App\Services\Api;

use App\Interfaces\ServiceInterface;


abstract class AbstractService implements ServiceInterface {

    protected $repository;
    protected $formRepository;
    protected $fieldRepository;
    
    public function list(): ?array {
        $list = [];
        foreach($this->repository->list() as $item){
            $list[] = $item;
        }
        return $list;
    }

    public function paginate(int $itemsPerPage = 10): ?array {
        return [$this->repository->paginate($itemsPerPage)];
    }

    public function getById(int $id): ?object {
        return $this->repository->getById($id);
    }

    public function create(array $request): ?array {
        return [$this->repository->create($request)];
    }

    public function update(array $request, int $id): int {
        return $this->repository->update($request, $id);
    }

    public function delete(int $id): int {
        return $this->repository->delete($id);
    }

    public function doc(): array {
        return $this->repository->doc();
    }

    public function getMetadata(int $id): array {
        return $this->repository->getMetadata($id);
    }

    public function setMetadata(array $request): array {
        return $this->repository->setMetadata($request);
    }

    public function getFormWithFields(string $name){
        $form_sdtClass = $this->formRepository->findAllByParams(array('name' => $name));
        $form_array = get_object_vars($form_sdtClass[0]);
        $form_array['attributes'] = json_decode($form_array['metadata'], true);

        $form_array['fields'] = $this->fieldRepository->findAllByParams(array('form_id' => $form_array['id'], 'order' => 'order'));
        $fields_array = array_map(function($item){
            $item->attributes = json_decode($item->metadata, true);
            return $item;
        }, $form_array['fields']);
        
        $form_array['fields'] = $fields_array;
        return $form_array;
    }

    public function getFormWithFieldsAndValues($formName, $id){
        $form = $this->getFormWithFields($formName);
        $data = $this->getById($id);
        foreach($form['fields'] as &$field){
            $fieldName = $field->name;
            $field->value = $data->$fieldName;
        }
        return $form;
    }
    
}