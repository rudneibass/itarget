<?php

namespace Tests\Unit;

use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex(){
        $response = $this->getJson('/api/events');
        $response->assertStatus(200);
    }

    public function testStore(){
        $eventData = ['name' => 'Test Event', 'start_date' => '2023-12-01', 'end_date' => '2023-12-02', 'status' => true];
        $response = $this->postJson('/api/events', $eventData);
        $response->assertStatus(201);
    }

    public function testShow(){
        $event = Event::factory()->create();
        $response = $this->getJson('/api/events/' . $event->id);
        $response->assertStatus(200);
    }

    public function testUpdate(){
        $event = Event::factory()->create();
        $updateData = ['name' => 'Updated Event Name'];
        $response = $this->putJson('/api/events/' . $event->id, $updateData);
        $response->assertStatus(200);
    }

    public function testDestroy(){
        $event = Event::factory()->create();
        $response = $this->deleteJson('/api/events/' . $event->id);
        $response->assertStatus(204);
    }
}
