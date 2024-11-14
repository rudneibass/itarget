<?php 

namespace App\AppModules\Event\Domain\UseCases\Registration\GetRegistrationForm;

use App\AppModules\Event\Domain\UseCases\Registration\GetRegistrationForm\GetRegistrationForm;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use Tests\TestCase;

class GetRegistrationFormTest extends TestCase {
    public function test_get_registration_form(){
        $useCase = new GetRegistrationForm(new FormRepository);
        $returnUseCase = $useCase->execute();

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}