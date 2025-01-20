<?php
namespace App\Modules\Api\Domain\Entities\Form;

use App\Modules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;
use PHPUnit\Framework\TestCase;

class FormFieldOptionDtoTest extends TestCase {

    public function test_field_options_dto_construct_a_correctly_object(){
        $dto = new FormFieldOptionDto([
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