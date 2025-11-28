<?php

namespace App\Modules\Payment\Domain\Entities;

use App\Modules\Payment\Domain\Entities\PixDto;
use PHPUnit\Framework\TestCase;

class PixDtoTest extends TestCase
{
    public function test_pix_dto_properties_assignment()
    {
        $pixDto = new PixDto([
            'description' => 'Pagamento de serviço',
            'productId' => '12345',
            'userId' => '67890',
            'value' => 100.50,
            'status' => 'pending',
            'qrCode' => 'qrcode123',
            'txId' => 'txid789',
            'apiResponse' => '{"status": "success"}'
        ]);
        
        $this->assertEquals('Pagamento de serviço', $pixDto->description);
        $this->assertEquals('12345', $pixDto->productId);
        $this->assertEquals('67890', $pixDto->userId);
        $this->assertEquals(100.50, $pixDto->value);
        $this->assertEquals('pending', $pixDto->status);
        $this->assertEquals('qrcode123', $pixDto->qrCode);
        $this->assertEquals('txid789', $pixDto->txId);
        $this->assertEquals('{"status": "success"}', $pixDto->apiResponse);
    }
}