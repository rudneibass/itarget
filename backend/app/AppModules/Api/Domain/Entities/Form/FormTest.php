<?php

namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\Form;
use App\AppModules\Api\Domain\Entities\Form\FormDto;
use PHPUnit\Framework\TestCase;

class FormTest extends TestCase {

    public function test_construct_sets_properties_correctly() {
        $form = 
        new Form( 
            new FormDto([
                'id' => '1',
                'name' => 'Form Name',
                'attributes' => [
                    "id" => "form-id",
                    "name" => "form-name"
                ]
            ])
        );

        $this->assertIsObject($form);
        $this->assertEquals('1', $form->id);
        $this->assertEquals('Form Name', $form->name);
        $this->assertIsArray($form->attributes);
    }
}
