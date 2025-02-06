<?php
namespace Tests\Unit\App\Modules\Payment\Domain\Entities;

use App\Modules\Payment\Domain\Entities\Pix;
use App\Modules\Payment\Domain\Entities\PixDto;
use PHPUnit\Framework\TestCase;

class PixTest extends TestCase
{
    public function test_pix_constructor_assigns_values_correctly()
    {
        $data = [
            'description' => 'Pagamento de serviço',
            'productId' => '12345',
            'userId' => '67890',
            'value' => 100.50,
            'status' => Pix::PENDING,
            'qrCode' => 'qrcode123',
            'txId' => 'txid789',
            'apiResponse' => '{"status": "success"}'
        ];
        
        $pix = new Pix (new PixDto($data));
        
        $this->assertEquals($data['description'], $pix->description);
        $this->assertEquals($data['productId'], $pix->productId);
        $this->assertEquals($data['userId'], $pix->userId);
        $this->assertEquals($data['value'], $pix->value);
        $this->assertEquals($data['status'], $pix->status);
        $this->assertEquals($data['qrCode'], $pix->qrCode);
        $this->assertEquals($data['txId'], $pix->txId);
        $this->assertEquals($data['apiResponse'], $pix->apiResponse);
    }

    public function test_to_array_method()
    {
        $data = [
            'description' => 'Pagamento de serviço',
            'productId' => '12345',
            'userId' => '67890',
            'value' => 100.50,
            'status' => Pix::PENDING,
            'qrCode' => 'qrcode123',
            'txId' => 'txid789',
            'apiResponse' => '{"status": "success"}'
        ];
        
        $pix = new Pix(new PixDto($data));
        $array = $pix->toArray();
        
        $this->assertEquals($data['description'], $array['description']);
        $this->assertEquals($data['productId'], $array['product_id']);
        $this->assertEquals($data['userId'], $array['user_id']);
        $this->assertEquals($data['value'], $array['value']);
        $this->assertEquals($data['status'], $array['status']);
        $this->assertEquals($data['qrCode'], $array['qr_code']);
        $this->assertEquals($data['txId'], $array['tx_id']);
        $this->assertEquals($data['apiResponse'], $array['api_response']);
    }
}
