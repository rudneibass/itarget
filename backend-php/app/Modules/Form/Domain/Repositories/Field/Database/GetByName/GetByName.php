<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\GetByName;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;
use Exception;

trait GetByName {
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
}