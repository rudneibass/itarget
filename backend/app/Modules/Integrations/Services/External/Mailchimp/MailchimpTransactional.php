<?php
namespace App\Modules\Integrations\Services\External\Mailchimp;

use Exception;
use  MailchimpTransactional\ApiClient;

class MailchimpTransactional {
    /*public function __construct(){
        $mailchimp = new ApiClient();
        $mailchimp->setApiKey('0b71257616fe57536bb440323fb9d15b-us19');
        $mailchimp->users->ping();
    }*/

    public function __construct()
    {
        try {
            $mailchimp = new ApiClient();
            $mailchimp->setApiKey('0b71257616fe57536bb440323fb9d15b-us19');
            $response = $mailchimp->users->ping();
            print_r($response);
          } catch (Exception $e) {
                echo 'Error: ',  $e->getMessage(), "\n";
          }
    }
}