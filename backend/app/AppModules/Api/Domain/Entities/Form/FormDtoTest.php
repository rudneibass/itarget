<?php
namespace App\AppModules\Api\Domain\Entities\Form;

use App\AppModules\Api\Domain\Entities\Form\FormDTO;
use PHPUnit\Framework\TestCase;

class FormDtoTeste extends TestCase {

    public function test_form_dto_construct_a_correctly_object(){
        $dto = new FormDTO([
            'id' => '1',
            'name' => 'Form Name',
            'is_active' => '1',
            'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals('1', $dto->id);
        $this->assertEquals('Form Name', $dto->name);
        $this->assertEquals('1', $dto->isActive);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $dto->metadata);
    }

    public function test_form_dto_construct_a_correctly_object_without_id(){
        $dto = new FormDTO([
            'name' => 'Form Name',
            'is_active' => '1',
            'metadata' => '{\"id\":\"form-id\",\"name\": \"form-name\"}',
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(null, $dto->id);
        $this->assertEquals('Form Name', $dto->name);
        $this->assertEquals('1', $dto->isActive);
        $this->assertEquals('{\"id\":\"form-id\",\"name\": \"form-name\"}', $dto->metadata);
    }
}