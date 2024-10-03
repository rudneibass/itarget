<?php

namespace App\AppModules\Api\Domain\Entities\Form\FormFieldOption;

use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOption;
use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;
use PHPUnit\Framework\TestCase;

class FormFieldOptionTest extends TestCase {

    public function test_construct_sets_properties_correctly() {
        $formFieldOption = 
        new FormFieldOption( 
            new FormFieldOptionDto([
                'id' => '1',
                'form_field_id' => '1',
                'name' => 'Option 1',
                'value' => '1',
                'order' => '1'
            ])
        );

        $this->assertIsObject($formFieldOption);
        $this->assertEquals('1', $formFieldOption->id);
        $this->assertEquals('Option 1', $formFieldOption->name);
    }
}
