<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database;

use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Entities\FormFieldOption\FormFieldOptionDto;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class FormRepository {

    public function __construct(private Model $formModelAdapter, private Database $databaseAdapter){}

    public function getByName(string $name) : Form {
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

    public function getById(string $id) : Form {
        $form = $this->formModelAdapter->where(['id' => $id]);

        if (!count($form)) { 
            throw new Exception("Não foi possivel localizar formulário com id = '".$id."'");
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

    /*public function getFormFieldOptions(string $formFieldId): array {
        return array_map(function($option) {
            return new FormFieldOptionDto([
                    'id' => $option['id'],
                    'form_field_id' => $option['form_field_id'],
                    'name' => $option['name'],
                    'value' => $option['value'],
                    'order' => $option['order'],
                    'selected' => $option['selected']
                ]);
            }, $this->databaseAdapter->rawQuery("SELECT * FROM 'form_field_id' WHERE form_id = {$formFieldId} ")
        );
    } */

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new Form(
                new FormDto([
                    'id' => (int) $item['id'],
                    'name' => $item['name'],
                    'attributes' => $item['attributes']
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }


    public function create(Form $form): ?Form {
        $newRecord = $this->formModelAdapter->create($form->toArray());
        $newRecord = $this->formModelAdapter->find((int)$newRecord['id']);
        return 
        new Form(
            new FormDto([
                'id' => $newRecord['id'],
                'name' => $newRecord['name'],
                'attributes' => $newRecord['attributes']
            ])
        );
    }

    /*
    public function update(Form $form): bool {
        $form = $this->formModelAdapter->find((int)$form->id);
        $form['name'] = $form['name'];
        $form['attributes'] = $form['attributes'];
        return $this->formModelAdapter->update($form['id'], $form);
    }*/

    public function update(Form $form): Form {
        $updated = $this->formModelAdapter->update($form->id, $form->toArray());
        return
        new Form(
            new FormDto([
                'id' => $updated['id'],
                'name' => $updated['name'],
                'attributes' => $updated['attributes']
            ])
        );
    }

    public function list(): array {
        return $this->formModelAdapter->all();
    }
}
