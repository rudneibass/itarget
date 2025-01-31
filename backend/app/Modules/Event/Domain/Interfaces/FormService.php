<?php

namespace App\Modules\Event\Domain\Interfaces;

interface FormService {
    function getByName(string $name): ?array;
}