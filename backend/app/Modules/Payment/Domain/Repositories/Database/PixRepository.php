<?php declare(strict_types=1);

namespace App\Modules\Payment\Domain\Repositories\Pix\Database;

use App\Modules\Payment\Domain\Entities\Pix;
use App\Modules\Payment\Domain\Entities\PixDto;

use App\Modules\Payment\Domain\Interfaces\Model;
use App\Modules\Payment\Domain\Interfaces\Database;

use Exception;

class PixRepository {

    public function __construct(private Model $modelAdapter, private Database $databaseAdapter){}

    public function create(Pix $pixTransaction): ?Pix {
        $newRecord = $this->modelAdapter->create($pixTransaction->toArray());
        return 
        new Pix(
            new PixDto([
                'product_id' => $newRecord['product_id'],
                'user_id' => $newRecord['user_id'],
                'status' => $newRecord['status'],
                'qr_code' => $newRecord['qr_code'],
                'tx_id' => $newRecord['tx_id'],
                'api_response' => $newRecord['api_response']
            ])
        );
    }

    public function update(Pix $pix): bool {
        return $this->modelAdapter->update($pix['id'], $pix->toArray());
    }

    public function list(): array {
        return $this->modelAdapter->all();
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'pix_transaction' 
            WHERE TRUE "
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['value']) && !empty($params['value']) ? " AND 'value' = {$params['value']}" : "" )
            .(isset($params['user_id']) && !empty($params['user_id']) ? " AND user_id = {$params['user_id']}" : "" )
            .(isset($params['product_id']) && !empty($params['product_id']) ? " AND product_id = {$params['product_id']}" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new Pix(
                new PixDto([
                    'product_id' => $item['product_id'],
                    'user_id' => $item['user_id'],
                    'value' => $item['value'],
                    'status' => $item['status'],
                    'qr_code' => $item['qr_code'],
                    'tx_id' => $item['tx_id'],
                    'api_response' => $item['api_response']
                ])
            );
        }, $this->databaseAdapter->rawQuery($query));
    }
}
