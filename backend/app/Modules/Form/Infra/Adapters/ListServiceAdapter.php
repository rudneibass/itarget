<?php

namespace App\Modules\Form\Infra\Adapters;

use App\Modules\Form\Domain\Interfaces\ListService as InterfacesListService;
use App\Modules\Integrations\Services\Internal\List\ListService;
use Illuminate\Http\Request;

class ListServiceAdapter implements InterfacesListService
{
    public function __construct(private ListService $listService){}

    public function getList(string $module, string $entity): ?array {
        return $this->listService->getList($module, $entity, new Request([]));
    }
}
