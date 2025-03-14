<?php

namespace App\Modules\Form\Domain\Entities\Option;

use PHPUnit\Framework\TestCase;

class OptionDtoTest extends TestCase {

    public function test_field_options_dto_construct_a_correctly_object(){
        $dto = new OptionDto([
            'id' => 1,
            'form_field_id' => 1,
            'value' => 1,
            'name' => 'Option 1',
            'order' => '1',
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(1, $dto->id);
        $this->assertEquals('Option 1', $dto->name);
        $this->assertEquals(1, $dto->value);
    }
}