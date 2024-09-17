<?php declare(strict_types=1);

namespace App\AppModules\Api\Infra\Repositories\Form\Database;

use App\AppModules\Api\Domain\Entities\Form\FieldDto;
use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use App\AppModules\Api\Domain\Entities\Form\FormRepositoryInterface;
use App\AppModules\Api\Infra\Models\EloquentORM\Form as FormModel;
use App\AppModules\Api\Infra\Models\EloquentORM\FormField as FormFieldModel;
use Exception;

class FormRepository implements FormRepositoryInterface {
    private $formModel;
    private $formFieldModel;

    public function __construct() {
        $this->formModel = new FormModel;
        $this->formFieldModel = new FormFieldModel;
    }

    public function get(string $name) : Form {
        
        $form = $this->formModel::where('name', $name)->first();
        if (!$form) { throw new Exception("Form not found"); }
        $fields = $this->formFieldModel::where('form_id', $form->id)->get()->toArray();
        
        $fieldsDto = array_map(function ($field) {
            return new FieldDto([
                'id' => $field['id'],
                'form_id' => $field['form_id'],
                'name' => $field['name'],
                'rules' => $field['rules'],
                'is_active' => $field['is_active'],
                'attributes' => json_decode($field['attributes'], true)
            ]);
        }, $fields);

        return new Form(
            new FormDto([
                'id' => $form->id,
                'name' => $form->name,
                'metadata' => $form->metadata,
                'attributes' => $form->attributes,
                'is_active' => $form->isActive,
                'fields' => $fieldsDto,
            ])
        );
    }
}