<?php
namespace App\Modules\Payment\Domain\Repositories\Pix\Database;

use App\Modules\Payment\Domain\Repositories\Pix\Database\PixRepository;
use App\Modules\Payment\Domain\Entities\Pix;
use App\Modules\Payment\Domain\Entities\PixDto;
use App\Modules\Payment\Infra\Adapters\DatabaseAdapter;
use App\Modules\Payment\Infra\Adapters\ModelAdapter;
use App\Modules\Payment\Infra\Models\Pix as PixModel;
use Tests\TestCase;

class PixRepositoryTest extends TestCase
{

    public function testCreatePix()
    {
        $pix = 
        new Pix(
            new PixDto([
                'description' => 'Pagamento de serviço',
                'product_id' => '12345',
                'user_id' => '67890',
                'value' => 100.50,
                'status' => 'PENDENTE',
                'qr_code' => 'qrcode123',
                'tx_id' => 'txid789',
                'api_response' => '{"status" : "success"}',
            ])
        );

        $pixRepository = new PixRepository(new ModelAdapter(new PixModel), new DatabaseAdapter);
        $createdPix = $pixRepository->create($pix);

        $this->assertInstanceOf(Pix::class, $createdPix);
        $this->assertEquals($pix->description, $createdPix->description);
    }


    public function testUdpdatePix()
    {
        $pix = 
        new Pix(
            new PixDto([
                'id' => '1',
                'description' => 'Pagamento de serviço',
                'product_id' => '12345',
                'user_id' => '67890',
                'value' => 100.50,
                'status' => 'PENDENTE',
                'qr_code' => 'qrcode123',
                'tx_id' => 'txid789',
                'api_response' => '{"status" : "success"}',
            ])
        );

        $pixRepository = new PixRepository(new ModelAdapter(new PixModel), new DatabaseAdapter);
        $updatedPix = $pixRepository->update($pix);

        $this->assertInstanceOf(Pix::class, $updatedPix);
        $this->assertEquals($pix->description, $updatedPix->description);
    } 

  
    public function testListPix(): void
    {
        $repository = new PixRepository(new ModelAdapter(new PixModel), new DatabaseAdapter);
        $result = $repository->list();
        $this->assertIsArray($result);
    } 


    public function testFindAllByParamsPix(): void
    {  
        $repository = new PixRepository(new ModelAdapter(new PixModel), new DatabaseAdapter);
        $result = $repository->findAllByParams([
            'id' => '1',
        ]);

        $this->assertIsArray($result);
        $this->assertInstanceOf(Pix::class, $result[0]);
    }
}
