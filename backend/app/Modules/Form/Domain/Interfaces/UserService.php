<?php

namespace App\Modules\Form\Domain\Interfaces;

interface UserService
{
    public function getById(int $id): ?array;
}