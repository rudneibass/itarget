<?php

namespace App\Modules\Integrations\Services\Internal\List;
use Illuminate\Http\Request;

class ListService {
    private $controllers = [
        'form' => [
            'form' => \App\Modules\Form\Infra\Controllers\Form\ListFormController::class
        ],
        'event' => [
            'registration' => \App\Modules\Event\Infra\Controllers\Registration\ListRegistrationController::class
        ],
    ];

    public function getList(string $module, string $entity, Request $request) : array {
        $controller = new $this->controllers[$module][$entity];
        return $controller->handle($request)->getData(true);
    }
}