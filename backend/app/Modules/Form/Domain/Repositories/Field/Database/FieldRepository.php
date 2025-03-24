<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class FieldRepository {

    public function __construct(private Model $fieldModelAdapter, private Database $databaseAdapter){}

    public function getByName(string $name) : Field {
        $formFields = $this->fieldModelAdapter->where(['name' => $name]);
        if (!count($formFields)) { 
            throw new Exception("Não foi possivel localizar campo com nome = '".$name."'"); 
        }  
        return 
        new Field(
            new FieldDto([
                'id' => $formFields[0]['id'],
                'form_id' => $formFields[0]['form_id'],
                'name' => $formFields[0]['name'],
                'rules' => $formFields[0]['rules'],
                'is_active' => $formFields[0]['is_active'],
                'attributes' => $formFields[0]['attributes'],
                'order' => $formFields[0]['order'],
            ])
        );
    }

    public function getById(string $id) : Field {
        $formField = $this->fieldModelAdapter->where(['id' => $id]);
        
        if (!count($formField)) { 
            throw new Exception("Não foi possivel localizar campo com id = '".$id."'");
        }
        return 
        new Field(
            new FieldDto([
                'id' => $formField[0]['id'],
                'form_id' => $formField[0]['form_id'],
                'name' => $formField[0]['name'],
                'rules' => $formField[0]['rules'],
                'is_active' => $formField[0]['is_active'],
                'attributes' => $formField[0]['attributes'],
                'order' => $formField[0]['order'],
            ])
        );
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['form_id']) && !empty($params['form_id']) ? " AND form_id = {$params['form_id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY \"order\", id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new Field(
                new FieldDto([
                    'id' => (string)$item['id'],
                    'form_id' => (string)$item['form_id'],
                    'is_active' => (string)$item['is_active'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'attributes' => $item['attributes'],
                    'order' => $item['order'],
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }


    public function create(Field $formField): ?Field {        
        $newRecord = $this->fieldModelAdapter->create($formField->toArray());
        $newRecord = $this->fieldModelAdapter->find((int)$newRecord['id']);
        return 
        new Field(
            new FieldDto([
                'id' => $newRecord['id'],
                'form_id' => $newRecord['form_id'],
                'name' => $newRecord['name'],
                'rules' => $newRecord['rules'],
                'is_active' => $newRecord['is_active'],
                'attributes' => $newRecord['attributes'],
                'order' => $newRecord['order'],
            ])
        );
    }

    public function update(Field $formField): bool {
        $field = $this->fieldModelAdapter->find((int)$formField->id);
        $field['name'] = $formField->name;
        $field['attributes'] = $formField->attributes;
        $field['rules'] = $formField->rules;
        $field['order'] = $formField->order;
        $field['form_id'] = $formField->formId;
        $field['is_active'] = $formField->isActive;
        return $this->fieldModelAdapter->update((int)$formField->id, $field);
    }

    public function list(): array {
        return array_map(function($item){
            return 
            new Field(
                new FieldDto([
                    'id' => $item['id'],
                    'form_id' => $item['form_id'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'is_active' => $item['is_active'],
                    'attributes' => $item['attributes'],
                    'order' => $item['order'],
                ])
            );
        }, $this->databaseAdapter->rawQuery('SELECT * FROM "form_field" ORDER BY "order" '));
    }

    public function getFormCreateByName(string $name) : Form {
        $form = $this->databaseAdapter->rawQuery("SELECT * FROM 'form' WHERE name = '{$name}' ");
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
                            'order' => $field['order'],
                            'attributes' => $field['attributes'],
                        ];
                    }, 
                    $this->databaseAdapter
                    ->rawQuery(
                        'SELECT * 
                        FROM "form_field" 
                        WHERE form_id = '.$form[0]["id"].' 
                        ORDER BY 
                        "order" ASC, 
                        name ASC, 
                        id ASC'
                    )
                )
            ])
        );
    }
    
    public function delete(string $id): int {
        return 1;
    }
}
