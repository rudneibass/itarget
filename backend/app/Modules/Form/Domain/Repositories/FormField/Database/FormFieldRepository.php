<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\FormField\Database;

use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Entities\FormField\FormField;
use App\Modules\Form\Domain\Entities\FormField\FormFieldDto;
use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class FormFieldRepository {

    public function __construct(private Model $formFieldModelAdapter, private Database $databaseAdapter){}

    public function getByName(string $name) : FormField {
        $formFields = $this->formFieldModelAdapter->where(['name' => $name]);
        if (!count($formFields)) { 
            throw new Exception("Não foi possivel localizar campo com nome = '".$name."'"); 
        }  
        return 
        new FormField(
            new FormFieldDto([
                'id' => $formFields[0]['id'],
                'form_id' => $formFields[0]['form_id'],
                'name' => $formFields[0]['name'],
                'rules' => $formFields[0]['rules'],
                'is_active' => $formFields[0]['is_active'],
                'attributes' => $formFields[0]['attributes'],
                'data_source' => $formFields[0]['data_source'],
                'order' => $formFields[0]['order'],
            ])
        );
    }

    public function getById(string $id) : FormField {
        $formField = $this->formFieldModelAdapter->where(['id' => $id]);
        
        if (!count($formField)) { 
            throw new Exception("Não foi possivel localizar campo com id = '".$id."'");
        }
        return 
        new FormField(
            new FormFieldDto([
                'id' => $formField[0]['id'],
                'form_id' => $formField[0]['form_id'],
                'name' => $formField[0]['name'],
                'rules' => $formField[0]['rules'],
                'is_active' => $formField[0]['is_active'],
                'attributes' => $formField[0]['attributes'],
                'data_source' => $formField[0]['data_source'],
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
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new FormField(
                new FormFieldDto([
                    'id' => (string)$item['id'],
                    'form_id' => (string)$item['form_id'],
                    'is_active' => (string)$item['is_active'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'attributes' => $item['attributes'],
                    'data_source' => $item['data_source'],
                    'order' => $item['order'],
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }


    public function create(FormField $formField): ?FormField {
        $newRecord = $this->formFieldModelAdapter->create($formField->toArray());

        return 
        new FormField(
            new FormFieldDto([
                'id' => $newRecord['id'],
                'form_id' => $newRecord['form_id'],
                'name' => $newRecord['name'],
                'rules' => $newRecord['rules'],
                'is_active' => $newRecord['is_active'],
                'attributes' => $newRecord['attributes'],
                'data_source' => $newRecord['data_source'],
                'order' => $newRecord['order'],
            ])
        );
    }

    public function update(FormField $formField): bool {
        $formField = $this->formFieldModelAdapter->find((int)$formField->id);
        $formField['name'] = $formField['name'];
        $formField['attributes'] = $formField['attributes'];
        return $this->formFieldModelAdapter->update($formField['id'], $formField);
    }

    public function list(): array {
        return array_map(function($item){
            return 
            new FormField(
                new FormFieldDto([
                    'id' => $item['id'],
                    'form_id' => $item['form_id'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'is_active' => $item['is_active'],
                    'attributes' => $item['attributes'],
                    'data_source' => $item['data_source'],
                    'order' => $item['order'],
                ])
            );
        }, $this->formFieldModelAdapter->all());
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
