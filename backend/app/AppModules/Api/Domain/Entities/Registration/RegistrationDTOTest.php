<?php
namespace App\AppModules\Api\Domain\Entities\Registration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationDTO;
use PHPUnit\Framework\TestCase;

class RegistrationDTOTeste extends TestCase {

    public function test_registration_dto_construct_a_correctly_object(){
        $dto = new RegistrationDTO([
            'id' => '123',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals('123', $dto->id);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
        $this->assertEquals('456', $dto->eventId);
    }

    public function test_registration_dto_construct_a_correctly_object_without_id(){
        $dto = new RegistrationDTO([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(null, $dto->id);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
        $this->assertEquals('456', $dto->eventId);
    }
}