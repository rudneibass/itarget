<?php

use Tests\TestCase;
use App\Services\RegistrationService;
use App\Models\Registration;
use App\Models\Event;

class RegistrationServiceTest extends TestCase
{
    public function testCreateRegistration()
    {
        // Criar um evento para utilizar nos testes
        $event = Event::factory()->create();

        $service = new RegistrationService();

        $data = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'cpf' => '12345678901',
            'event_id' => '2',
        ];

        // Testar o cadastro bem-sucedido
        $registration = $service->createRegistration($data);

        $this->assertInstanceOf(Registration::class, $registration);
        $this->assertEquals($data['name'], $registration->name);
        $this->assertEquals($data['email'], $registration->email);
        $this->assertEquals($data['cpf'], $registration->cpf);
        $this->assertEquals($data['event_id'], $registration->event_id);
    }

    public function testCreateRegistrationWithConflict()
    {
        $service = new RegistrationService();

        // Adapte conforme necessário para incluir dados válidos e um conflito de datas
        $data = [
            'email' => 'raul.shields@labadie.com',
            'event_id' => 1,
            "name" => "Raul",
            "cpf" => "04222413348",
        ];

        $this->expectException(ValidationException::class);
        $this->expectExceptionMessage('Conflito de datas encontrado.');
        
        $service->createRegistration($data);
    }
}