<?php
namespace App\Modules\Integrations\Services\External\Mailchimp;

use  MailchimpMarketing\ApiClient;

class MailchimpClient {
    public function __construct()
    {
        $mailchimp = new ApiClient();

        $mailchimp->setConfig([
          'apiKey' => '0b71257616fe57536bb440323fb9d15b-us19',
          'server' => 'us19'
        ]);
        
        $response = $mailchimp->ping->get();
        print_r($response);
    }
}