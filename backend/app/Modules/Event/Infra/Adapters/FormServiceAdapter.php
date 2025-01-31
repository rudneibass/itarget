<?php
namespace App\Modules\Event\Infra\Adapters;

use App\Modules\Event\Domain\Interfaces\FormService as FormServiceInterfaca;
use App\Modules\Services\Form\FormService;

class FormServiceAdapter implements FormServiceInterfaca {
    public function __construct(private FormService $formService){}

    public function getByName(string $name): ?array{
        return $this->formService->getByName($name)->getData(true);
    }
}