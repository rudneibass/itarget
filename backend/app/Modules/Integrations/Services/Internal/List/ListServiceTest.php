<?php
namespace App\Modules\Integrations\Services\Internal\List;
use Illuminate\Http\Request;
use Tests\TestCase;

class ListServiceTest extends TestCase
{
    public function testGetList()
    {
        $listService = new ListService();
        $result = $listService->getList('event', 'registration', new Request([]));
        $this->assertIsArray($result);
        # $this->assertNotEmpty($result);
        # $this->assertArrayHasKey('id', $result[0]);
        # $this->assertArrayHasKey('name', $result[0]);
    }
}
