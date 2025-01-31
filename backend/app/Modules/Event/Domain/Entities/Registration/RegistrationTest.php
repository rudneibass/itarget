<?php

namespace App\Modules\Event\Domain\Entities\Registration;

use App\Modules\Event\Domain\Entities\Registration\Registration;
use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use PHPUnit\Framework\TestCase;

class RegistrationTest extends TestCase
{
    public function test_construct_sets_properties_correctly()
    {
        $dto = new RegistrationDto([
            'id' => '1',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '1',
            'registration_id' => '1'
        ]);

        $registration = new Registration($dto);

        $this->assertEquals('1', $registration->getId());
        $this->assertEquals('John Doe', $registration->getName());
        $this->assertEquals('john.doe@example.com', $registration->getEmail());
        $this->assertEquals('123.456.789-10', $registration->getCpf());
        $this->assertEquals('1', $registration->getEventId());
        $this->assertEquals('1', $registration->getRegistrationId());
    }


    public function test_toArray_method_returns_correct_structure()
    {
        $dto = new RegistrationDto([
            'id' => '1',
            'event_id' => '1',
            'registration_id' => '1',
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'published' => true
        ]);

        $registration = new Registration($dto);
        $array = $registration->toArray();

        $this->assertIsArray($array);
        $this->assertEquals('1', $array['id']);
        $this->assertEquals('John Doe', $array['name']);
        $this->assertEquals('john.doe@example.com', $array['email']);
        $this->assertEquals('123.456.789-10', $array['cpf']);
        $this->assertEquals('1', $array['event_id']);
        $this->assertEquals('1', $array['registration_id']);
        $this->assertEquals(true, $array['published']);
    }

    public function test_toArray_method_returns_correct_structure_without_id()
    {
        $dto = new RegistrationDto([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'cpf' => '123.456.789-10',
            'event_id' => '1',
            'registration_id' => '1',
            'published' => false
        ]);

        $registration = new Registration($dto);
        $array = $registration->toArray();

        $this->assertIsArray($array);
        $this->assertEquals(null, $array['id']);
        $this->assertEquals('John Doe', $array['name']);
        $this->assertEquals('john.doe@example.com', $array['email']);
        $this->assertEquals('123.456.789-10', $array['cpf']);
        $this->assertEquals('1', $array['event_id']);
        $this->assertEquals('1', $array['registration_id']);
        $this->assertEquals(false, $array['published']);
    }
}
