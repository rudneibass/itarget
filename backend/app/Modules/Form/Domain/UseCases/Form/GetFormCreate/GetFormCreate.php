<?php

namespace App\Modules\Form\Domain\UseCases\Form\GetFormCreate;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Repositories\Option\Database\OptionRepository;
use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
class GetFormCreate {
    private $repository;
    
    public function __construct(Model $modelAdapter, Database $databaseAdapter){
        $this->repository = new FormRepository($modelAdapter, $databaseAdapter);
    }

    public function execute(){
        $form = $this->repository->getByName(Form::FORM_NAME);

        $fields = 
        array_map(
            function($field) {
                $field['attributes'] = json_decode($field['attributes'], true);
                if (isset($field['attributes']['type']) && $field['attributes']['type'] === 'select') {
                    $methodDataSource = $field['attributes']['data_source'];
                    if (method_exists(OptionRepository::class, $methodDataSource)) {
                        $field['options'] = OptionRepository::$methodDataSource($field['id']);
                    }
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