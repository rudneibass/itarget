<?php 

namespace App\Modules\Event\Domain\UseCases\Registration\CreateRegistration;

use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use App\Modules\Event\Infra\Repositories\Registration\Memory\RegistrationRepository;
use PHPUnit\Framework\TestCase;

class CreateRegistrationTest extends TestCase {
    public function test_create_registration_success(){
        $repository = new RegistrationRepository();
        $useCase = new CreateRegistration($repository);
        $dto = new RegistrationDto([
            'event_id' => '1',
            'registration_id' => '1',
            'name' => 'Joe Doe',
            'email' => 'joe.doe@email.com',
            'cpf' => '123.456.789-10' 
        ]);
        
        $returnUseCase = $useCase->execute($dto);

        $this->assertIsArray($returnUseCase);
        $this->assertArrayHasKey('id', $returnUseCase);
        $this->assertNotNull($returnUseCase['id']);
    }
}