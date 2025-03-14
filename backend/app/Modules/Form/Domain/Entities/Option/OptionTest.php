<?php

namespace App\Modules\Form\Domain\Entities\Option;

use PHPUnit\Framework\TestCase;

class OptionTest extends TestCase {

    public function test_construct_sets_properties_correctly() {
        $formFieldOption = 
        new Option( 
            new OptionDto([
                'id' => 1,
                'form_field_id' => 1,
                'name' => 'Option 1',
                'value' => 1,
                'order' => '1'
            ])
        );

        $this->assertIsObject($formFieldOption);
        $this->assertEquals('1', $formFieldOption->id);
        $this->assertEquals('Option 1', $formFieldOption->name);
    }
}
