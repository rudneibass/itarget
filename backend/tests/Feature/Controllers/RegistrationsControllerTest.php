<?php

namespace Tests\Feature;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(){
        $response = $this->getJson('/api/registrations');
        $response->assertStatus(200);
    }

    public function testStore(){
        $event = Event::latest('updated_at')->first();
        $registrationData = ['name' => 'Rudnei Nascimento', 'email' => 'rudnei@gmail.com', 'cpf' => '38461938879', 'event_id'=> $event->id];
        $response = $this->postJson('/api/registrations', $registrationData);
        $response->assertStatus(201);
    }

    public function testShow(){
        $registration = Registration::factory()->create();
        $response = $this->getJson('/api/registrations/' . $registration->id);
        $response->assertStatus(200);
    }

    public function testUpdate(){
        $registration = Registration::factory()->create();
        $updateData = ['name' => 'Rudnei Xavier'];
        $response = $this->putJson('/api/registrations/' . $registration->id, $updateData);
        $response->assertStatus(200);
    }

    public function testDestroy(){
        $registration = Registration::factory()->create();
        $response = $this->deleteJson('/api/registrations/' . $registration->id);
        $response->assertStatus(204);
    }

}
