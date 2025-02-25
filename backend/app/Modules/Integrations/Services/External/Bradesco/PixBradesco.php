<?php
namespace App\Modules\Integrations\Services\External\Bradesco;

use Illuminate\Support\Facades\Http;
use Exception;

class PixBradesco
{
    private string $baseUrl;

    public function __construct(private string $clientId, private string $clientSecret){
        $this->baseUrl = config('services.itau.pix_url');
    }

    private function authenticate(): string
    {
        try {
            $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
                'grant_type' => 'client_credentials',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
            ]);

            if ($response->failed()) {
                throw new Exception("Erro ao autenticar na API do Itaú: " . $response->body());
            }

            return $response->json('access_token');
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function generate(string $contaReceberId, float $valor, string $descricao): array
    {
        $token = $this->authenticate();

        try {
            $response = Http::withToken($token)->post("{$this->baseUrl}/pix/qrcodes", [
                'conta_receber_id' => $contaReceberId,
                'valor' => $valor,
                'descricao' => $descricao,
            ]);

            if ($response->failed()) {
                throw new Exception("Erro ao gerar QR Code: " . $response->body());
            }

            return $response->json();
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function searchPayment(string $txId): array
    {
        $token = $this->authenticate();

        try {
            $response = Http::withToken($token)->get("{$this->baseUrl}/pix/{$txId}");

            if ($response->failed()) {
                throw new Exception("Erro ao consultar pagamento: " . $response->body());
            }

            return $response->json();
        } catch (Exception $e) {
            throw $e;
        }
    }
}
