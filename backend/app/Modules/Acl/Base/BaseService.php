<?php

namespace App\Modules\Acl\Base;

abstract class BaseService {

    protected $dao;
    protected $formDao;
    protected $fieldDao;
    
    public function getAll(): ?array {
        return $this->dao->getAll();
    }

    public function paginate(int $itemsPerPage = 10): ?array {
        return [$this->dao->paginate($itemsPerPage)];
    }

    public function getById(int $id): ?object {
        return $this->dao->getById($id);
    }

    public function create(array $request): ?array {
        return [$this->dao->create($request)];
    }

    public function update(array $request, int $id): int {
        return $this->dao->update($request, $id);
    }

    public function delete(int $id): int {
        return $this->dao->delete($id);
    }

    public function getDoc(): array {
        return $this->dao->getDoc();
    }

    public function getFormCreate(string $name){
        
        echo '<pre>';
        print_r($this->formDao);
        echo '</pre>';
        die;

        $form_sdtClass = $this->formDao->findAllByParams(array('name' => $name));
        $form_array = get_object_vars($form_sdtClass[0]);
        $form_array['attributes'] = json_decode($form_array['attributes'], true);

        $form_array['fields'] = $this->fieldDao->findAllByParams(array('form_id' => $form_array['id'], 'order' => 'order'));
        $fields_array = array_map(function($item){
            $item->attributes = json_decode($item->metadata, true);
            return $item;
        }, $form_array['fields']);
        
        $form_array['fields'] = $fields_array;
        return $form_array;
    }

    public function getFormEdit($formName, $id){
        $form = $this->getFormCreate($formName);
        $data = $this->getById($id);
        foreach($form['fields'] as &$field){
            $fieldName = $field->name;
            $field->value = $data->$fieldName;
        }
        return $form;
    }
    
}