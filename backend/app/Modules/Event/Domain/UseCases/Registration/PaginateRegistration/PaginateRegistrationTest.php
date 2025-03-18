<?php 

namespace App\Modules\Event\Domain\UseCases\Registration\PaginateRegistration;

use App\Modules\Event\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\Modules\Event\Infra\Adapters\DatabaseAdapter;
use App\Modules\Event\Infra\Adapters\ModelAdapter;
use App\Modules\Event\Infra\Models\EloquentORM\Registration;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class PaginateRegistrationTest extends TestCase {
    public function test_list_registration() {
        $useCase = new PaginateRegistration(new ModelAdapter(new Registration), new DatabaseAdapter);
        $returnUseCase = $useCase->execute([]);
        $this->assertInstanceOf(LengthAwarePaginator::class, $returnUseCase);
    }    
}




