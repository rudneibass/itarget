<?php
namespace App\AppModules\Api\Domain\Entities\Form\FormField;

use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;
use PHPUnit\Framework\TestCase;

class FormFieldDtoTeste extends TestCase {

    public function test_field_dto_construct_a_correctly_object(){
        $dto = new FormFieldDto([
            "id" => "1",
			"form_id" => "1",
			"name" => "name",
			"rules" => "[{\"rule\": \"required\", \"message\": \"Required Field\"}, {\"rule\": \"email\", \"message\": \"Invalid email address.\"}]",
			"metadata" => "{\"grid\": 12, \"label\": \"Nome\", \"type\": \"text\",\"name\": \"name\",\"id\": \"name\",\"class\": \"form-control\", \"required\": \"required\", \"toggle\":\"tooltip\",\"placement\":\"bottom\",\"title\":\"Full name.\"}",
			"is_active" => "1",
			"value" => "Value",
			"options" => [
				new FormFieldOptionDto([
					'id' => '1',
					'is_active' => '1',
					'form_field_id' => '1',
					'name' => 'Option 1',
					'selected' => 'selected',
					'value' => '1',
					'order' => '1',
				])
			],
			"attributes" => [
				"grid" => "12",
				"label" => "Nome",
				"type" => "text",
				"name" => "name",
				"id" => "name",
				"value" => "Value",
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
        $dto = new FormFieldDto([
			"form_id" => "1",
			"name" => "name",
			"rules" => "[{\"rule\": \"required\", \"message\": \"Required Field\"}, {\"rule\": \"email\", \"message\": \"Invalid email address.\"}]",
			"metadata" => "{\"grid\": 12, \"label\": \"Nome\", \"type\": \"text\",\"name\": \"name\",\"id\": \"name\",\"class\": \"form-control\", \"required\": \"required\", \"toggle\":\"tooltip\",\"placement\":\"bottom\",\"title\":\"Full name.\"}",
			"is_active" => "1",
			"options" => [
				new FormFieldOptionDto([
					'id' => '1',
					'is_active' => '1',
					'form_field_id' => '1',
					'name' => 'Option 1',
					'selected' => 'selected',
					'value' => '1',
					'order' => '1',
				])
			],
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