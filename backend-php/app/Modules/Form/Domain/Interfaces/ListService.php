<?php

namespace App\Modules\Form\Domain\Interfaces;

interface ListService
{
    public function getList(string $module, string $entity) : ?array;
}