<?php

namespace App\AppModules\Api\Infra\Repositories\Form\Database;

use App\AppModules\Api\Infra\Repositories\Form\Database\FormRepository;
use Tests\TestCase;

class FormRepositoryTest extends TestCase {

    public function test_getForm() {
        $repository = new FormRepository;
        $form = $repository->get('registration');
        $this->assertIsObject($form);
    }

    public function test_getFormFieldOptions() {
        $repository = new FormRepository;
        $options = $repository->getFormFieldOptions('1');
        $this->assertIsArray($options);
    }
}
