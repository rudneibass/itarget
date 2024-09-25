<?php

namespace Tests\Unit\Domain\Entities\Form\FormField;

use PHPUnit\Framework\TestCase;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormField;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;
use App\AppModules\Api\Domain\Entities\Form\FormFieldOption\FormFieldOptionDto;

class FormFieldTest extends TestCase
{
    public function testFormFieldConstructor()
    {
        $dto = new FormFieldDto([
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

        var_dump($dto);

        $formField = new FormField($dto);

        $this->assertIsObject($formField);

        /*
        $this->assertEquals('456', $formField->getFormId());
        $this->assertEquals('Sample Field', $formField->getName());
        $this->assertEquals('required', $formField->getRules());
        $this->assertEquals('1', $formField->getIsActive());
        $this->assertEquals(['class' => 'form-control', 'type' => 'text'], $formField->getAttributes());
        $this->assertEquals('Sample Value', $formField->getValue());
        $this->assertEquals(['option1', 'option2'], $formField->getOptions());
        $this->assertEquals('api/v1/data', $formField->getDataSource());
        */
    }
}
