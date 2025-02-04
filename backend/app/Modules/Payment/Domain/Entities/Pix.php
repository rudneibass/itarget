<?php
namespace App\Modules\Payment\Domain\Entities;

use App\Modules\Payment\Domain\Base\EntityBase;

class Pix extends EntityBase
{
    CONST PAID = 'PAGO';
    CONST PENDING = 'PENDENTE';

    public string $description;
    public string $productId;
    public string $userId;
    public float $value;
    public ?string $status = null;
    public ?string $qrCode = null;
    public ?string $txId = null;
    public ?array $apiResponse = null;

    public function __construct(PixDto $dto) {
        $this->description = $dto->description;
        $this->productId = $dto->productId;
        $this->userId = $dto->userId;
        $this->value = $dto->value;
        $this->status = $dto->status;
        $this->qrCode = $dto->qrCode;
        $this->txId = $dto->txId;
        $this->apiResponse = $dto->productId;
    }

    public function toArray(){
        return [
            'description' => $this->description,
            'product_id' => $this->productId,
            'user_id' => $this->userId,
            'valor' => $this->valor,
            'status' => $this->status,
            'qr_code' => $this->qrCode,
            'tx_id' => $this->txid,
            'api_response' => $this->apiResponse,
        ];
    }
}
