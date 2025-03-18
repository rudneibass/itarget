<?php

namespace App\Modules\Form\Domain\Entities\Form;

use App\Modules\Form\Domain\Entities\Form\FormDto;
use PHPUnit\Framework\TestCase;

class FormDtoTest extends TestCase {

    public function test_form_dto_construct_a_correctly_object(){
        $dto = new FormDto([
            'id' => 1,
            'name' => 'Form Name',
            'attributes' => '{
                "id" => "form-id",
                "name" => "form-name"
            }'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(1, $dto->id);
        $this->assertEquals('Form Name', $dto->name);
    }

    public function test_form_dto_construct_a_correctly_object_without_id(){
        $dto = new FormDto([
            'name' => 'Form Name',
            'attributes' => '{
                "id" => "form-id",
                "name" => "form-name"
            }'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(null, $dto->id);
        $this->assertEquals('Form Name', $dto->name);
    }
}