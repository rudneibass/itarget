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

}
