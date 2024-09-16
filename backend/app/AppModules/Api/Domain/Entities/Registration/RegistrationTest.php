<?php

namespace App\AppModules\Api\Domain\Entities\Registration;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationDTO;
use PHPUnit\Framework\TestCase;

class RegistrationTest extends TestCase
{
    public function test_construct_sets_properties_correctly()
    {
        $dto = new RegistrationDTO([
            'id' => '123',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $registration = new Registration($dto);

        $this->assertEquals('123', $registration->getId());
        $this->assertEquals('John Doe', $registration->getName());
        $this->assertEquals('john.doe@example.com', $registration->getEmail());
        $this->assertEquals('123.456.789-10', $registration->getCpf());
        $this->assertEquals('456', $registration->getEventId());
    }

    public function test_construct_sets_properties_correctly_without_id()
    {
        $dto = new RegistrationDTO([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $registration = new Registration($dto);

        $this->assertEquals(null, $registration->getId());
        $this->assertEquals('John Doe', $registration->getName());
        $this->assertEquals('john.doe@example.com', $registration->getEmail());
        $this->assertEquals('123.456.789-10', $registration->getCpf());
        $this->assertEquals('456', $registration->getEventId());
    }

    public function test_toArray_method_returns_correct_structure()
    {
        $dto = new RegistrationDTO([
            'id' => '123',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $registration = new Registration($dto);
        $array = $registration->toArray();

        $this->assertIsArray($array);
        $this->assertEquals('123', $array['id']);
        $this->assertEquals('John Doe', $array['name']);
        $this->assertEquals('john.doe@example.com', $array['email']);
        $this->assertEquals('123.456.789-10', $array['cpf']);
        $this->assertEquals('456', $array['event_id']);
    }

    public function test_toArray_method_returns_correct_structure_without_id()
    {
        $dto = new RegistrationDTO([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '456'
        ]);

        $registration = new Registration($dto);
        $array = $registration->toArray();

        $this->assertIsArray($array);
        $this->assertEquals(null, $array['id']);
        $this->assertEquals('John Doe', $array['name']);
        $this->assertEquals('john.doe@example.com', $array['email']);
        $this->assertEquals('123.456.789-10', $array['cpf']);
        $this->assertEquals('456', $array['event_id']);
    }
}
