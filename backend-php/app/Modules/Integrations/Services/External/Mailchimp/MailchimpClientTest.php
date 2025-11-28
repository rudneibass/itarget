<?php

namespace App\Modules\Integrations\Services\External\Mailchimp;

use App\Modules\Integrations\Services\External\Mailchimp\MailchimpClient;
use Tests\TestCase;

class MailchimpClientTest extends TestCase
{
    public function test_mailchimp_marketing_can_be_instantiated()
    {
        $mailchimp = new MailchimpClient();
        $this->assertInstanceOf(MailchimpClient::class, $mailchimp);
    }
}
