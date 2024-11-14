<?php 

namespace App\AppModules\Form\Domain\UseCases\FormFieldFormEdit\GetFormFieldFormEdit;

use App\AppModules\Form\Domain\UseCases\FormField\GetFormFieldFormEdit\GetFormFieldFormEdit;
use App\AppModules\Form\Infra\Repositories\FormField\Database\FormFieldRepository;
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