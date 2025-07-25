<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\List;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;

trait ListField {
    public function list(): array {
        return array_map(function($item){
            return 
            new Field(
                new FieldDto([
                    'id' => $item['id'],
                    'form_id' => $item['form_id'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'is_active' => $item['is_active'],
                    'attributes' => $item['attributes'],
                    'order' => $item['order'],
                ])
            );
        }, $this->databaseAdapter->rawQuery('SELECT * FROM "form_field" ORDER BY "order" '));
    }
}