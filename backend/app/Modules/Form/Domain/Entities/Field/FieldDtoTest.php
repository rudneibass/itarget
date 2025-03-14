<?php

namespace App\Modules\Form\Domain\Entities\Field;

use PHPUnit\Framework\TestCase;

class FieldDtoTest extends TestCase {

    public function test_field_dto_construct_a_correctly_object(){
        $dto = new FieldDto([
			"id" => 1,
			"form_id" => 1,
			"name" => "name",
			"rules" => "[{\"rule\": \"required\", \"message\": \"Required Field\"}, {\"rule\": \"email\", \"message\": \"Invalid email address.\"}]",
			"attributes" => [
				"grid" => "12", 
				"label" => "Nome", 
				"type" => "text",
				"name" => "name",
				"id" => "name",
				"class" => "form-control", 
				"required" => "required", 
				"toggle" =>"tooltip",
				"placement" =>"bottom",
				"title" => "Full name."
			]
		]);

        $this->assertIsObject($dto);
		$this->assertEquals(1, $dto->id);
    }
}