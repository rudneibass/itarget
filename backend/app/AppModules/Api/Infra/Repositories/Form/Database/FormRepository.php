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

class FormRepository implements FormRepositoryInterface {
    private $formModel;
    private $formFieldModel;
    private $formFieldOptionModel;

    public function __construct() {
        $this->formModel = new FormModel;
        $this->formFieldModel = new FormFieldModel;
        $this->formFieldOptionModel = new FormFieldOptionModel;
    }

    public function get(string $name) : Form {
        
        $form = $this->formModel::where('name', $name)->first();
        if (!$form) { throw new Exception("Form not found"); }
        $fields = $this->formFieldModel::where('form_id', $form->id)->get()->toArray();
        
        $fieldsDto = array_map(function ($field) {
            return new FormFieldDto([
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

    public function getFormFieldOptions(string $formFieldId): array {
        return array_map(function($option) {
            return new FormFieldOptionDto([
                'id' => $option['id'],
                'form_field_id' => $option['form_field_id'],
                'name' => $option['name'],
                'value' => $option['value'],
                'order' => $option['order'],
                'selected' => $option['selected'],
                'is_active' => $option['is_active']
            ]);
        }, $this->formFieldOptionModel::where('form_field_id', $formFieldId)->get()->toArray());
    }
}