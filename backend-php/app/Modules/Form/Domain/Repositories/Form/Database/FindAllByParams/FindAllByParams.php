<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\FindAllByParams;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;
use Exception;

trait FindAllByParams {
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
                    'id' => (int) $item['id'],
                    'name' => $item['name'],
                    'attributes' => $item['attributes']
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }
}