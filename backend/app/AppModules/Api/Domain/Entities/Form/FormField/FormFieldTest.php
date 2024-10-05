<?php

namespace Tests\Unit\Domain\Entities\FormField\FormField;

use App\AppModules\Api\Domain\Entities\Form\FormField\FormField;
use App\AppModules\Api\Domain\Entities\Form\FormField\FormFieldDto;

use PHPUnit\Framework\TestCase;

class FormFieldTest extends TestCase
{
    public function test_form_field_constructor()
    {
        $formField = 
        new FormField(
            new FormFieldDto([
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
            ])
        );
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
