<?php

namespace App\Modules\Event\Domain\UseCases\Registration\GetRegistrationForm;

use App\Modules\Event\Domain\Interfaces\FormService;

class GetRegistrationForm {

    public function __construct( private FormService $formServiceAdapter){}

    public function execute(array $request): array {
        return $this->formServiceAdapter->getByName($request['form_name']);
    }
}