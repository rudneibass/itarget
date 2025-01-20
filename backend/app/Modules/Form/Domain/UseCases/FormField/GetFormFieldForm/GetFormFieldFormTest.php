<?php 

namespace App\Modules\Form\Domain\UseCases\FormField\GetFormFieldForm;

use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use Tests\TestCase;

class GetFormFieldTest extends TestCase {
    public function test_get_registration_form(){
        $useCase = new  GetFormFieldForm(new FormRepository);
        $returnUseCase = $useCase->execute();

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}