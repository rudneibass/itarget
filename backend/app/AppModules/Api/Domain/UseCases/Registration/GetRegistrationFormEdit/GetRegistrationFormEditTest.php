<?php 

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit;

use App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit\GetRegistrationFormEdit;
use App\AppModules\Api\Infra\Repositories\Registration\Memory\RegistrationRepository;
use Tests\TestCase;

class GetRegistrationFormEditTest extends TestCase {
    public function test_get_form_registration_edit(){
        $useCase = new GetRegistrationFormEdit(new RegistrationRepository);
        
        $returnUseCase = $useCase->execute('1');

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}