<?php

namespace Tests\Unit\Bank;

use App\Modules\Shared\Services\External\Itau\PixItau;
use PHPUnit\Framework\TestCase;

class PixItauTest extends TestCase
{
    private PixItau $pixItau;

    public function setup(): void
    {
        $this->pixItau = new PixItau([
            'number' => '10b051c9-a96e-4274-a43b-c3a14421d42b',
            'secret' => '37c3ca46-1318-41e8-8001-381c4b5b7788',
            'environment' => 'production',
            'key_pix' => '45339405000197'
        ], 'sandbox');
    }

    public function testItShouldConnectionJwt()
    {
        $jwt = $this->pixItau->generateClientToken();
        $this->assertNotEmpty($jwt->access_token);
        $this->assertNotEmpty($jwt->token_type);
        $this->assertNotEmpty($jwt->expires_in);
        $this->assertNotEmpty($jwt->active);
        $this->assertNotEmpty($jwt->scope);
    }

    public function testItShouldPixCharge()
    {
        $pix = $this->pixItau->create(
            [
                ['pessoa_cpf' => '01234567890',   'pessoa_nome' => 'Pessoa 1',  'valor' => '1', 'instrucao_boleto' => 'cartao']
            ]
        );
        $this->assertNotEmpty($pix['tid']);
        $this->assertNotEmpty($pix['text']);
        $this->assertNotEmpty($pix['date']);
        $this->assertNotEmpty($pix['expire']);
        $this->assertNotEmpty($pix['qrcode']);
    }

    public function testItShouldPixStatus()
    {
        // $pix = $this->pixItau->create(
        //     [
        //         ['pessoa_cpf' => '01234567890',   'pessoa_nome' => 'Pessoa 1',  'valor' => '1', 'instrucao_boleto' => 'cartao']
        //     ]
        // );
        $pix = $this->pixItau->capture(['tid' => '8ca40a2bd788416792afc84abdd8a44c']);
        $this->assertNotEmpty($pix['status']);
        $this->assertNotEmpty($pix['tid']);
        $this->assertNotEmpty($pix['authorizationCode']);
        $this->assertNotEmpty($pix['payerSolicition']);
        $this->assertNotEmpty($pix['location']);
        $this->assertIsInt($pix['revision']);
        $this->assertNotEmpty($pix['data_ocorrencia']);
        $this->assertNotEmpty($pix['data_baixa']);
    }
}
