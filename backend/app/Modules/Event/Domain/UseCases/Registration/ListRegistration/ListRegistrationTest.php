<?php 

namespace App\Modules\Event\Domain\UseCases\Registration\ListRegistration;

use App\Modules\Event\Domain\UseCases\Registration\ListRegistration\ListRegistration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
use Tests\TestCase;

class ListRegistrationTest extends TestCase {
    public function test_list_registration() {
        $useCase = new ListRegistration(new ModelAdapter(new Registration), new DatabaseAdapter);
        $returnUseCase = $useCase->execute([]);
        $this->assertIsArray($returnUseCase);
    }
}

