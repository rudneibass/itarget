<?php
namespace App\AppModules\Api\Domain\Entities\Registration;

use App\AppModules\Api\Domain\Entities\Registration\RegistrationDto;
use PHPUnit\Framework\TestCase;

class RegistrationDtoTeste extends TestCase {

    public function test_registration_dto_construct_a_correctly_object(){
        $dto = new RegistrationDto([
            'id' => '123',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '1',
            'registration_id' => '1'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals('123', $dto->id);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
        $this->assertEquals('1', $dto->eventId);
        $this->assertEquals('1', $dto->registrationId);
    }

    public function test_registration_dto_construct_a_correctly_object_without_id(){
        $dto = new RegistrationDto([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '1',
            'registration_id' => '1'
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(null, $dto->id);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
        $this->assertEquals('1', $dto->eventId);
        $this->assertEquals('1', $dto->registrationId);
    }
}