<?php declare(strict_types=1);

namespace App\AppModules\Api\Infra\Repositories\FormField\Database;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormField;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldRepository as FormFieldRepositoryInterface;
use App\AppModules\Api\Infra\Models\EloquentORM\FormField as FormFieldModel;
use Illuminate\Support\Facades\DB;
use Exception;
class FormFieldRepository implements FormFieldRepositoryInterface {
    private $model;

    public function __construct() {
        $this->model = new FormFieldModel();
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['form_id']) && !empty($params['form_id']) ? " AND form_id = {$params['form_id']}" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY 'order'" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new FormField(
                new FormFieldDto([
                    'id' => (string) $item->id,
                    'formId' => (string) $item->form_id,
                    'name' => $item->name,
                    'order' => $item->order,
		            'rules' => $item->rules,
                    'attributes' => $item->attributes
                ]
            ));
        }, DB::select($query));
    }

    public function get( string $id ) : FormField {
        $formField = $this->model::find($id);
        if(!$formField){ throw new Exception('Não foi possivel localizar campo com id = '.$id); }
        return new FormField(
            new FormFieldDto([
                'id' => (string) $formField['id'],
                'form_id' => (string) $formField['form_id'],
                'name' => $formField['name'],
                'order' => $formField['order'],
                'attributes' => $formField['attributes']
            ])
        );
    }

    public function list(): array {
      return array_map(function($formField) {
            return new FormFieldDto([
                'id' => $formField['id'],
                'form_id' => $formField['form_field_id'],
                'name' => $formField['name'],
                'attributes' => $formField['attributes']
            ]);
        }, $this->model::all()->toArray());
    }


    public function create(FormField $formField): ?FormField {
        $formFieldModel = $this->model::
        create([
            'form_id' => (string) $formField->formId,
            'name' => (string) $formField->name,
		    'attributes' => (string) $formField->attributes,
		    'rules' => (string) $formField->rules
        ]);

        return new FormField(
            new FormFieldDto([
                'id' => (string) $formFieldModel->id,
                'form_id' => (string) $formFieldModel->form_id,
                'name' => $formFieldModel->name,
		        'rules' => $formFieldModel->rules,
                'attributes' => $formFieldModel->attributes
            ])
        );
    }

    public function findAllBySingleParam(string $param): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE id = {$param}
            OR name like '%{$param}%'
            ORDER BY name";
            
        return array_map(function($item){
            return 
            new FormField(
                new FormFieldDto([
                    'id' => $item->id,
                    'form_id' => $item->form_id,
                    'name' => $item->name,
		            'rules' => $item->rules,
                    'attributes' => $item->attributes
                ]
            ));
        }, DB::select($query));
    }

    public function update(FormField $formField): bool {
        $formFieldModel = FormFieldModel::find($formField->id);
        $formFieldModel->name = $formField->name;
        $formFieldModel->attributes = $formField->attributes;
        $formFieldModel->rules = $formField->rules;
        $formFieldModel->order = $formField->order;
        return $formFieldModel->save();
    }

    public function delete(string $id): int {
        return $this->model::findOrFail($id)->delete();
    }
}