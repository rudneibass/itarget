<?php 

namespace App\Modules\Event\Domain\UseCases\Registration\GetRegistration;

use App\Modules\Event\Domain\UseCases\Registration\GetRegistration\GetRegistration;
use App\Modules\Event\Infra\Repositories\Registration\Memory\RegistrationRepository;
use PHPUnit\Framework\TestCase;

class GetRegistrationTest extends TestCase {
    public function test_get_registration(){
        $repository = new RegistrationRepository();
        $useCase = new GetRegistration($repository);
        
        $returnUseCase = $useCase->execute('1');

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}