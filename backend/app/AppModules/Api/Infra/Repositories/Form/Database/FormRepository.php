<?php declare(strict_types=1);

namespace App\AppModules\Api\Infra\Repositories\Form\Database;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;
use App\AppModules\Api\Domain\Entities\Form\FormRepositoryInterface;

use App\AppModules\Api\Infra\Models\EloquentORM\Form as FormModel;
use App\AppModules\Api\Infra\Models\EloquentORM\FormField as FormFieldModel;
use App\AppModules\Api\Infra\Models\EloquentORM\FormFieldOption as FormFieldOptionModel;

use Exception;
use Illuminate\Support\Facades\DB;

class FormRepository implements FormRepositoryInterface {
    private $formModel;
    private $formFieldModel;
    private $formFieldOptionModel;

    public function __construct() {
        $this->formModel = new FormModel;
        $this->formFieldModel = new FormFieldModel;
        $this->formFieldOptionModel = new FormFieldOptionModel;
    }

    public function get(string $id) : Form {
        
        $form = $this->formModel::where('id', $id)->first();
        if (!$form) { $form = $this->formModel::where('name', $id)->first(); }
        if (!$form) { throw new Exception("Não foi possivel localizar formulário com id ou nome = '".$id."'"); }

        $form->attributes = json_decode($form->attributes, true);
        $fields = 
        array_map(
            function ($field) {
                return new FormFieldDto([
                    'id' => (string) $field['id'],
                    'form_id' => (string) $field['form_id'],
                    'name' => $field['name'],
                    'rules' => $field['rules'],
                    'attributes' => json_decode($field['attributes'], true)
                ]);
            }, 
            $this->formFieldModel::where('form_id', $form->id)
            ->orderBy('order', 'asc')
            ->orderBy('name', 'asc')
            ->orderBy('id', 'asc')
            ->get()
            ->toArray()
        );

        return new Form(
            new FormDto([
                'id' => $form->id,
                'name' => $form->name,
                'attributes' => $form->attributes,
                'fields' => $fields,
            ])
        );
    }

    public function getFormFieldOptions(string $formFieldId): array {
        return array_map(function($option) {
            return new FormFieldOptionDto([
                'id' => $option['id'],
                'form_field_id' => $option['form_field_id'],
                'name' => $option['name'],
                'value' => $option['value'],
                'order' => $option['order'],
                'selected' => $option['selected']
            ]);
        }, $this->formFieldOptionModel::where('form_field_id', $formFieldId)->get()->toArray());
    }

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
                    'id' => (int) $item->id,
                    'name' => $item->name,
                    'attributes' => json_decode($item->attributes, true)
                ])
            );
        }, DB::select($query));
    }

    public function create(Form $form): ?Form {
        $formModel = $this->formModel::
        create([
            'id' => $form->id,
            'name' => $form->name,
            'attributes' => $form->attributes
        ]);

        return new Form(
            new FormDto([
                'id' => $formModel->id,
                'name' => $formModel->name,
                'attributes' => $formModel->attributes
            ])
        );
    }

    public function list(): array {
        return [];
    }

    public function delete(string $id): int {
        return 1;
    }
}
