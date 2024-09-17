<?php
namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\FieldDto;
use PHPUnit\Framework\TestCase;

class FieldDtoTeste extends TestCase {

    public function test_field_dto_construct_a_correctly_object(){
        $dto = new FieldDto([
            "id" => "1",
			"form_id" => "1",
			"name" => "name",
			"rules" => "[{\"rule\": \"required\", \"message\": \"Required Field\"}, {\"rule\": \"email\", \"message\": \"Invalid email address.\"}]",
			"metadata" => "{\"grid\": 12, \"label\": \"Nome\", \"type\": \"text\",\"name\": \"name\",\"id\": \"name\",\"class\": \"form-control\", \"required\": \"required\", \"toggle\":\"tooltip\",\"placement\":\"bottom\",\"title\":\"Full name.\"}",
			"is_active" => "1",
			"attributes" => [
				"grid" => "12",
				"label" => "Nome",
				"type" => "text",
				"name" => "name",
				"id" => "name",
				"class" => "form-control",
				"required" => "required",
				"toggle" => "tooltip",
				"placement" => "bottom",
				"title" => "Full name."
            ]
        ]);

        $this->assertIsObject($dto);
    }

    public function test_field_dto_construct_a_correctly_object_without_id(){
        $dto = new FieldDto([
			"form_id" => "1",
			"name" => "name",
			"rules" => "[{\"rule\": \"required\", \"message\": \"Required Field\"}, {\"rule\": \"email\", \"message\": \"Invalid email address.\"}]",
			"metadata" => "{\"grid\": 12, \"label\": \"Nome\", \"type\": \"text\",\"name\": \"name\",\"id\": \"name\",\"class\": \"form-control\", \"required\": \"required\", \"toggle\":\"tooltip\",\"placement\":\"bottom\",\"title\":\"Full name.\"}",
			"is_active" => "1",
			"attributes" => [
				"grid" => "12",
				"label" => "Nome",
				"type" => "text",
				"name" => "name",
				"id" => "name",
				"class" => "form-control",
				"required" => "required",
				"toggle" => "tooltip",
				"placement" => "bottom",
				"title" => "Full name."
            ]
        ]);

        $this->assertIsObject($dto);
    }
}