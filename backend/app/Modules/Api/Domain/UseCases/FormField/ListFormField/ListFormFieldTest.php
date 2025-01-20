<?php 

namespace App\Modules\Api\Domain\UseCases\FormField\ListFormField;

use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Tests\TestCase;

class ListFormFieldTest extends TestCase {
    public function test_list_registration(){
        $repository = new FormFieldRepository;
        $useCase = new ListFormField($repository);
        $returnUseCase = $useCase->execute();
        $this->assertIsArray($returnUseCase);
    }
}