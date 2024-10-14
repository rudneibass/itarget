<?php 

namespace App\AppModules\Api\Domain\UseCases\FormFieldFormEdit\GetFormFieldFormEdit;

use App\AppModules\Api\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\AppModules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Tests\TestCase;

class GetFormFieldFormEditTest extends TestCase {
    public function test_get_form_registration_edit(){
        $useCase = new GetFormFieldFormEdit(new FormFieldRepository);
        
        $returnUseCase = $useCase->execute(['form_name' => 'form-field', 'id' => '1']);

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}