<?php 

namespace App\AppModules\Api\Domain\UseCases\Form\Paginateform;

use App\AppModules\Api\Domain\UseCases\Registration\PaginateRegistration\PaginateRegistration;
use App\AppModules\Api\Infra\Repositories\Registration\Database\RegistrationRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class PaginateRegistrationTest extends TestCase {
    public function test_paginate_registration(){
        $repository = new RegistrationRepository();
        $useCase = new  PaginateRegistration($repository);

        $this->assertInstanceOf(LengthAwarePaginator::class, $useCase->execute());
    }
}