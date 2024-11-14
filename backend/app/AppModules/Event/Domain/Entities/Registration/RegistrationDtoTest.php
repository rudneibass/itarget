<?php
namespace App\AppModules\Event\Domain\Entities\Registration;

use App\AppModules\Event\Domain\Entities\Registration\RegistrationDto;
use PHPUnit\Framework\TestCase;

class RegistrationDtoTest extends TestCase {

    public function test_registration_dto_construct_a_correctly_object(){
        $dto = new RegistrationDto([
            'id' => '1',
            'event_id' => '1',
            'registration_id' => '1',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals('1', $dto->id);
        $this->assertEquals('1', $dto->eventId);
        $this->assertEquals('1', $dto->registrationId);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
    }

    public function test_registration_dto_construct_a_correctly_object_without_id(){
        $dto = new RegistrationDto([
            'event_id' => '1',
            'registration_id' => '1',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
        ]);

        $this->assertIsObject($dto);
        $this->assertEquals(null, $dto->id);
        $this->assertEquals('1', $dto->eventId);
        $this->assertEquals('1', $dto->registrationId);
        $this->assertEquals('John Doe', $dto->name);
        $this->assertEquals('john.doe@example.com', $dto->email);
        $this->assertEquals('123.456.789-10', $dto->cpf);
    }
}