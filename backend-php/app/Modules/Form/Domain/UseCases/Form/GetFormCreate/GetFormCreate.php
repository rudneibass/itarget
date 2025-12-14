<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormCreate;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\ListService;
use App\Modules\Form\Domain\Interfaces\Model;
class GetFormCreate {
    private $formRepository;

    public function __construct(
        private Model $modelAdapter, 
        private  Database $databaseAdapter, 
        private  ListService $listServiceAdapter
    ){
        $this->formRepository = new FormRepository($this->modelAdapter, $this->databaseAdapter);
    }

    public function execute(){
        $form = $this->formRepository->getByName(Form::FORM_NAME);

        $fields = 
        array_map(
            function($field) {
                if ($field->attributes['type'] === 'select') {
                    $field->setOptions($this->listServiceAdapter->getList($field->module, $field->entity));
                }
                return $field;
            }, $form->fields
        );

        return [
            'id' => $form->id,
            'name' => $form->name,
            'attributes' => $form->attributes,
            'fields' =>  $fields
        ];
    }
}