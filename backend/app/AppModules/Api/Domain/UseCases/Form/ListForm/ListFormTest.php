<?php 

namespace App\AppModules\Api\Domain\UseCases\Registration\ListRegistration;

use App\AppModules\Api\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Memory\RegistrationRepository;
use Tests\TestCase;

class ListRegistrationTest extends TestCase {
    public function test_list_registration(){
        $repository = new RegistrationRepository();
        $useCase = new ListRegistration($repository);
        $returnUseCase = $useCase->execute();
        $this->assertIsArray($returnUseCase);
    }
}