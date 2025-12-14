<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\GetByName;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use Exception;

trait GetByName {
    public function getByName(string $name): Form {
        $form = $this->formModelAdapter->where(['name' => $name]);
        if (!count($form)) { 
            throw new Exception("Não foi possivel localizar formulário com nome = '".$name."'"); 
        }

        $form = 
        new Form(
            new FormDto([ 
                'id' => $form[0]['id'],
                'name' => $form[0]['name'],
                'attributes' => $form[0]['attributes'],
            ])
        );

        $fields = 
        array_map(
            function ($field) {
                return new Field(
                    new FieldDto([
                        'id' => (string) $field['id'],
                        'form_id' => (string) $field['form_id'],
                        'name' => $field['name'],
                        'rules' => $field['rules'],
                        'attributes' => $field['attributes']
                    ])
                );
            }, 
            $this->databaseAdapter
            ->rawQuery(
                "SELECT * FROM 'form_field' WHERE form_id = {$form->getId()} 
                ORDER BY 'order' asc, 'name' asc, id asc"
            )
        );
        
        $form->setFields($fields);

        return $form;
    }
}