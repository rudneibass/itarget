<?php
namespace App\AppModules\Api\Domain\Entities\Form;

use PHPUnit\Framework\TestCase;

class FieldOptionDtoTest extends TestCase {

    public function test_field_options_dto_construct_a_correctly_object(){
        $dto = new FieldOptionDto([
            "value" => "Values",
			"label" => "Label",
			"selecte" => "selecte"
        ]);

        $this->assertIsObject($dto);
    }
}