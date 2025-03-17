<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormCreate;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;
class GetFormCreate {
    private $repository;

    public function __construct(
        private Model $modelAdapter, 
        private  Database $databaseAdapter, 
        private  ListService $listServiceAdapter
    ){
        $this->repository = new FormRepository($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(){
        $form = $this->repository->getByName(Form::FORM_NAME);

        $fields = 
        array_map(
            function($field) {
                $field['attributes'] = json_decode($field['attributes'], true);
                if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                    
                    # Passar os atributos do metodo $this->listServiceAdapter->getList();
                    # dinamicamente, pegando os valores do cadastro do input no bano de dados
                    # coloquei $this->listServiceAdapter->getList('event', 'registration') a nivel de teste.
                    # Os novos atributos para armazenar esse paramentos devem ser: module e entity.
                    # Deve ser feita uma verificação para checar se os valores estão preenchidos
                    # de não, gere uma lista de options vazia.

                    $field['options'] = $this->listServiceAdapter->getList('event', 'registration');
                }
                return $field;
            }, $form->fields
        );

        return [
            'id' => $form->id,
            'name' => $form->name,
            'attributes' => json_decode($form->attributes, true),
            'fields' =>  $fields
        ];
    }
}