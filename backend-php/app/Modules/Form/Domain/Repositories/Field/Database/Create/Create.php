<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Create;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;

trait Create {
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
}