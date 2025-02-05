<?php

namespace App\Modules\Shared\Services\External\Itau;
use Illuminate\Support\Facades\Http;
use Exception;

class PixItau 
{
    private $clientId;
    private $clientSecret;
    private $baseUrl = 'https://secure.api.itau';
    private $baseUrlOAuth = 'https://sts.itau.com.br';
    private $accessToken;
    private $key;
    private $crt_path;
    private $key_path;
    
    public function __construct(array $keys = [], string $environment = 'production')
    {
        if (empty($keys['number']) || empty($keys['secret'])) {
            throw new Exception("Credenciais pix invalida");
        }
        if ($keys['environment'] != 'production') {
            $this->baseUrl = 'https://devportal.itau.com.br/sandboxapi/pix_recebimentos_ext_v2/v2';
            $this->baseUrlOAuth = 'https://devportal.itau.com.br/sandboxapi/pix_recebimentos_ext_v2/v2';
        }

        if (
            !is_dir(__DIR__ . '/Certificate/'. $keys['client'] . '/' . $keys['controle_layout_id']) ||
            !file_exists(__DIR__ . '/Certificate/' . $keys['client'] . '/' . $keys['controle_layout_id'] . '/certificate.crt')
        ) {
            throw new Exception("Certificado não encontrado para o cliente " . $keys['client'] . " no controle layout " . $keys['controle_layout_id']);
        }

        $this->crt_path = __DIR__ . '/Certificate' . '/' . $keys['client'] . '/' . $keys['controle_layout_id'] . '/certificate.crt';
        $this->key_path = __DIR__ . '/Certificate' . '/' . $keys['client'] . '/' . $keys['controle_layout_id'] . '/privateKey.key';
        $this->clientId = trim($keys['number']);
        $this->clientSecret = trim($keys['secret']);
        $this->key = $keys['key_pix'];
        $this->accessToken = $this->generateClientToken()->access_token;
    }

    public function create(array $product): array
    {
        $product = current($product);

        try {

            $response = Http::withOptions([
                'verify' => false,
                'cert' => $this->crt_path,
                'ssl_key' => $this->key_path,
                'ssl_key_type' => 'PEM',
                'ssl_cert_type' => 'PEM'
            ])->withHeaders([
                'x-correlationID' => '1',
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->accessToken
            ])->post($this->baseUrl . '/pix_recebimentos/v2/cob', [
                'calendario' => [
                    'expiracao' => "6000"
                ],
                'devedor' => [
                    "cpf" => $product['pessoa_cpf'],
                    'nome' => $product['pessoa_nome']
                ],
                'chave' => $this->key,
                'valor' => [
                    "original" => number_format($product['valor'], 2, '.',''),
                ],
                'solicitacaoPagador' => $product['pessoa_nome']
            ]);

            $response = $response->json();

            if (isset($response['status']) && $response['status'] === 400 ){ return $response; }

            if (isset($response['error'])) throw new Exception($response['error']['response']['data']['message']);

            return [
                'tid' => $response['txid'],
                'text' => $response['pixCopiaECola'],
                'date' => $response['calendario']['criacao'],
                'expire' => $response['calendario']['expiracao'],
                'qrcode' => $response['pixCopiaECola']
            ];
        } catch (Exception $th) {
            throw $th;
        }
    }

    public function capture(array $product): array
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->baseUrl . '/pix_recebimentos/v2/cob/' . $product['tid'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSLCERT => $this->crt_path,
            CURLOPT_SSLKEY => $this->key_path,
            CURLOPT_CAINFO => $this->crt_path,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
                'x-correlationID: 1',
                'Content-Type: application/json',
                'Authorization: Bearer ' . $this->accessToken,
            ),
        ));
        $response = curl_exec($curl);
        
        return $response = json_decode($response);
    }

    public function generateClientToken()
    {
        try {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $this->baseUrlOAuth . '/api/oauth/token',
                CURLOPT_SSLCERT => $this->crt_path,
                CURLOPT_SSLKEY => $this->key_path,
                CURLOPT_CAINFO => $this->crt_path,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => 'grant_type=client_credentials&client_id=' . $this->clientId . '&client_secret=' . $this->clientSecret,
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/x-www-form-urlencoded'
                ),
            ));

            $response = curl_exec($curl);
            curl_close($curl);

            if ($response == 'Unauthorized') { 
                throw new Exception("Transação não autorizada, verifique as chaves do cliente");
            }

            $response = json_decode($response);

            if (isset($response->codigo_erro) && $response->codigo_erro == 'C500'){
                throw new Exception($response->mensagem);  
            } 
            
            if (isset($response->error)){
                throw new Exception($response->error);
            } 

            return $response;
        } catch (Exception $th) {
            throw $th;
        }
    }

}
