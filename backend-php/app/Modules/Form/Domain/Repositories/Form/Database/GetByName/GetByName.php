<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\GetByName;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use Exception;

trait GetByName {
    public function getByName(string $name): Form {
        $form = $this->formModelAdapter->where(['name' => $name]);
        if (!count($form)) { 
            throw new Exception("Não foi possivel localizar formulário com nome = '".$name."'"); 
        }
        return new Form(
            new FormDto([
                'id' => $form[0]['id'],
                'name' => $form[0]['name'],
                'attributes' => $form[0]['attributes'],
                'fields' => 
                array_map(
                    function ($field) {
                        return [
                            'id' => (string) $field['id'],
                            'form_id' => (string) $field['form_id'],
                            'name' => $field['name'],
                            'rules' => $field['rules'],
                            'attributes' => $field['attributes']
                        ];
                    }, 
                    $this->databaseAdapter
                    ->rawQuery(
                        "SELECT * 
                        FROM 'form_field' 
                        WHERE form_id = {$form[0]['id']} 
                        ORDER BY 
                        'order' asc, 
                        'name' asc, 
                        id asc"
                    )
                )
            ])
        );
    }
}