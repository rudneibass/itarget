<?php 

namespace App\Modules\Api\Domain\UseCases\FormField\GetFormField;

use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use PHPUnit\Framework\TestCase;

class GetRegistrationTest extends TestCase {
    public function test_get_registration(){
        $repository = new FormFieldRepository();
        $useCase = new GetFormField($repository);
        $returnUseCase = $useCase->execute('1');

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}