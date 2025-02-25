<?php

namespace App\Modules\Integrations\Services\External\Mailchimp;

use App\Modules\Integrations\Services\External\Mailchimp\MailchimpTransactional;
use Tests\TestCase;

class MailchimpTransactionalTest extends TestCase
{
    public function test_mailchimp_marketing_can_be_instantiated()
    {
        $mailchimp = new MailchimpTransactional();
        $this->assertInstanceOf(MailchimpTransactional::class, $mailchimp);
    }
}
