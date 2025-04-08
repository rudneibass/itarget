<?php
namespace App\Modules\Integrations\Services\Internal\List;
use Illuminate\Http\Request;
use Tests\TestCase;

class ListServiceTest extends TestCase
{
    public function testGetList()
    {
        $listService = new ListService();
        $result = $listService->getList(
            $module = 'form', 
            $entity = 'form', 
            $request = new Request([])
        );
        $this->assertIsArray($result);
    }

    public function testGetListFiltered()
    {
        $listService = new ListService();
        $result = $listService->getList(
            $module = 'form',  
            $entity = 'form', 
            $request = new Request([]), 
            $filter = ['id'=> 1]
        );
        $this->assertIsArray($result);
    }
}
