<?php

namespace App\Modules\Form\Domain\UseCases\Field\GetFieldCreateForm;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Repositories\Field\Database\FieldRepository;

class GetFieldCreateForm {
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private Database $databaseAdapter,
        private ListService $listServiceAdapter
    ){
        $this->repository = new FieldRepository( 
            fieldModelAdapter: $modelAdapter, 
            databaseAdapter: $databaseAdapter
        );
    }

    public function execute(){
        $formField = $this->repository->getFormCreateByName(Field::FORM_NAME);
        $fields = 
        array_map(
            function($field) {
                $field['attributes'] = json_decode($field['attributes'], true);
                if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                    
                    # Passar os atributos do metodo $this->listServiceAdapter->getList();
                    # dinamicamente, pegando os valores do cadastro do input no bano de dados
                    # coloquei $this->listServiceAdapter->getList('form', 'form') a nivel de teste.
                    # Os novos atributos para armazenar esse paramentos devem ser: module e entity.
                    # Deve ser feita uma verificação para checar se os valores estão preenchidos
                    # de não, gere uma lista de options vazia.

                    $field['options'] = $this->listServiceAdapter->getList('form', 'form');
                }
                return $field;
            }, $formField->fields
        );
        
        return [
            'id' => $formField->id,
            'name' => $formField->name,
            'attributes' => json_decode($formField->attributes, true),
            'fields' =>  $fields
        ];
    }
}