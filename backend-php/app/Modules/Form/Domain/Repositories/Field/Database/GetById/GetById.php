<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\GetById;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;
use Exception;

trait GetById {
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
}