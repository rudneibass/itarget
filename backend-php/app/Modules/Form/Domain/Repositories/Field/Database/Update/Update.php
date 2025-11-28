<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Update;

use App\Modules\Form\Domain\Entities\Field\Field;

trait Update {
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
}