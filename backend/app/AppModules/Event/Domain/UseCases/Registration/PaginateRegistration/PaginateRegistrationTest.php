<?php 

namespace App\AppModules\Event\Domain\UseCases\Registration\PaginateRegistration;

use App\AppModules\Event\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\AppModules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class PaginateRegistrationTest extends TestCase {
    public function test_paginate_registration(){
        $repository = new RegistrationRepository();
        $useCase = new  PaginateRegistration($repository);

        $this->assertInstanceOf(LengthAwarePaginator::class, $useCase->execute());
    }
}