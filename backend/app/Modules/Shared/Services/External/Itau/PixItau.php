<?php

namespace App\Modules\Shared\Services\External\Itau;
use Illuminate\Support\Facades\Http;
use Exception;

class PixItau 
{
    private $baseUrl = 'https://secure.api.itau';
    private $baseUrlOAuth = 'https://sts.itau.com.br';
    
    private $clientSecret;
    private $clientId;
    
    private $keyPix;
    private $crtPath;
    private $keyPath;

    private $accessToken;
    
    public function setCredentials(array $credentials)
    {
        if (config('environment') != 'production') {
            $this->baseUrl = 'https://devportal.itau.com.br/sandboxapi/pix_recebimentos_ext_v2/v2';
            $this->baseUrlOAuth = 'https://devportal.itau.com.br/sandboxapi/pix_recebimentos_ext_v2/v2';
        }

        if (empty($credentials['number']) || empty($credentials['secret'])) {
            throw new Exception("Credenciais pix invalida");
        }

        if (!file_exists(__DIR__ . '/Certificate/' . $credentials['client'] . '/certificate.crt')) {
            throw new Exception("Certificado não encontrado para o cliente " . $credentials['client'] . " no controle layout " . $credentials['controle_layout_id']);
        }

        $this->crtPath = __DIR__ . '/Certificate' . '/' . $credentials['client'] . '/certificate.crt';
        $this->keyPath = __DIR__ . '/Certificate' . '/' . $credentials['client'] . '/privateKey.key';
        $this->clientId = trim($credentials['number']);
        $this->clientSecret = trim($credentials['secret']);
        $this->keyPix = $credentials['key_pix'];
        $this->accessToken = $this->generateClientToken()->access_token;
    }

    public function create(array $pix): array
    {
        if (!isset($pix['pessoa_cpf']) || empty($pix['pessoa_cpf'])) {
            throw new Exception('$pix["pessoa_cpf"] obrigatório para gera pix.');
        }
        
        if (!isset($pix['pessoa_nome']) || empty($pix['pessoa_nome'])) {
            throw new Exception('$pix["pessoa_nome"] obrigatório para gera pix.');
        }

        if (!isset($pix['valor']) || empty($pix['valor'])) {
            throw new Exception('$pix["valor"] obrigatório para gera pix.');
        }

        try {

            $response = Http::withOptions([
                'verify' => false,
                'cert' => $this->crtPath,
                'ssl_key' => $this->keyPath,
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
                    "cpf" => $pix['pessoa_cpf'],
                    'nome' => $pix['pessoa_nome']
                ],
                'chave' => $this->keyPix,
                'valor' => [
                    "original" => number_format($pix['valor'], 2, '.',''),
                ],
                'solicitacaoPagador' => $pix['pessoa_nome']
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

    public function capture(array $pix): array
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $this->baseUrl . '/pix_recebimentos/v2/cob/' . $pix['tid'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_SSLCERT => $this->crtPath,
            CURLOPT_SSLKEY => $this->keyPath,
            CURLOPT_CAINFO => $this->crtPath,
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

    private function generateClientToken()
    {
        try {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_URL => $this->baseUrlOAuth . '/api/oauth/token',
                CURLOPT_SSLCERT => $this->crtPath,
                CURLOPT_SSLKEY => $this->keyPath,
                CURLOPT_CAINFO => $this->crtPath,
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
