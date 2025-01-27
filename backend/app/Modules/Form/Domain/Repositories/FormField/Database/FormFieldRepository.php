<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\FormField\Database;

use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Entities\FormField\FormField;
use App\Modules\Form\Domain\Entities\FormField\FormFieldDto;
use App\Modules\Form\Domain\Entities\FormFieldOption\FormFieldOptionDto;
use App\Modules\Form\Domain\Interfaces\Database;
use Exception;

class FormFieldRepository {

    public function __construct(private Model $formFieldModelAdapter, private Database $databaseAdapter){}

    public function getByName(string $name) : FormField {
        $formField = $this->formFieldModelAdapter->where(['name' => $name]);
                
        if (!count($formField)) { 
            throw new Exception("Não foi possivel localizar FormFieldulário com nome = '".$name."'"); 
        }  

        return new FormField(
            new FormFieldDto([
                'id' => $formField[0]['id'],
                'name' => $formField[0]['name'],
                'attributes' => $formField[0]['attributes'],
                'fields' => 
                array_map(
                    function ($field) {
                        return [
                            'id' => (string) $field['id'],
                            'FormField_id' => (string) $field['FormField_id'],
                            'name' => $field['name'],
                            'rules' => $field['rules'],
                            'attributes' => $field['attributes']
                        ];
                    }, 
                    $this->databaseAdapter
                    ->rawQuery(
                        "SELECT * 
                        FROM 'field_field' 
                        WHERE form_field_id = {$formField[0]['id']} 
                        ORDER BY 
                        'order' asc, 
                        'name' asc, 
                        id asc"
                    )
                )
            ])
        );
    }

    public function getById(string $id) : FormField {
        $formField = $this->formFieldModelAdapter->where(['id' => $id]);

        if (!count($formField)) { 
            throw new Exception("Não foi possivel localizar FormFieldulário com id = '".$id."'");
        }

        return new FormField(
            new FormFieldDto([
                'id' => $formField[0]['id'],
                'name' => $formField[0]['name'],
                'attributes' => $formField[0]['attributes'],
                'fields' => 
                array_map(
                    function ($field) {
                        return [
                            'id' => (string) $field['id'],
                            'form_field_id' => (string) $field['FormField_id'],
                            'name' => $field['name'],
                            'rules' => $field['rules'],
                            'attributes' => $field['attributes']
                        ];
                    }, 
                    $this->databaseAdapter
                    ->rawQuery(
                        "SELECT * 
                        FROM 'form_field' 
                        WHERE form_field_id = {$formField[0]['id']} 
                        ORDER BY 
                        'order' asc, 
                        'name' asc, 
                        id asc"
                    )
                )
            ])
        );
    }

    public function getFormFieldFieldOptions(string $formFieldId): array {
        return array_map(function($option) {
            return new FormFieldOptionDto([
                'id' => $option['id'],
                'form_field_id' => $option['form_field_id'],
                'name' => $option['name'],
                'value' => $option['value'],
                'order' => $option['order'],
                'selected' => $option['selected']
            ]);
        }, $this->databaseAdapter->rawQuery("SELECT * FROM 'form_field_id' WHERE form_field_id = {$formFieldId} ")
    );

    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
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
                    'name' => $item['name'],
                    'attributes' => $item['attributes']
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }


    public function create(FormField $formField): ?FormField {
        $newRecord = $this->formFieldModelAdapter->
        create([
            'name' => $formField->name,
            'attributes' => $formField->attributes
        ]);

        return 
        new FormField(
            new FormFieldDto([
                'id' => $newRecord['id'],
                'name' => $newRecord['name'],
                'attributes' => $newRecord['attributes']
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

    public function delete(string $id): int {
        return 1;
    }
}
