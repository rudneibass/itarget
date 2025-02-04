<?php
namespace App\Modules\Payment\Domain\Entities;

use App\Modules\Payment\Domain\Base\DtoBase;

class PixDto extends DtoBase
{
    public string $description;
    public string $productId;
    public string $userId;
    public float $value;
    public ?string $status = null;
    public ?string $qrCode = null;
    public ?string $txId = null;
    public ?array $apiResponse = null;
}
