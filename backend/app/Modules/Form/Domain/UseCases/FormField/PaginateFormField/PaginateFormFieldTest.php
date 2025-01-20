<?php 

namespace App\Modules\Api\Domain\UseCases\FormField\PaginateFormField;

use App\Modules\Api\Domain\UseCases\FormField\PaginateFormField\PaginateFormField;
use App\Modules\Api\Infra\Repositories\FormField\Database\FormFieldRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class PaginateFormFieldTest extends TestCase {
    public function test_paginate_FormField(){
        $repository = new FormFieldRepository();
        $useCase = new  PaginateFormField($repository);

        $this->assertInstanceOf(LengthAwarePaginator::class, $useCase->execute());
    }
}