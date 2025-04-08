<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\FindAllByParams;

use App\Modules\Form\Domain\Entities\Field\Field;
use App\Modules\Form\Domain\Entities\Field\FieldDto;

trait FindAllByParams {
    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'form_field' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['form_id']) && !empty($params['form_id']) ? " AND form_id = {$params['form_id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY \"order\", id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new Field(
                new FieldDto([
                    'id' => (string)$item['id'],
                    'form_id' => (string)$item['form_id'],
                    'is_active' => (string)$item['is_active'],
                    'name' => $item['name'],
                    'rules' => $item['rules'],
                    'attributes' => $item['attributes'],
                    'order' => $item['order'],
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }
}