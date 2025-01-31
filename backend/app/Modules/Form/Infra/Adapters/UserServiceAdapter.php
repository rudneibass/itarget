<?php

namespace App\Modules\Form\Infra\Adapters;

use App\Modules\Form\Domain\Interfaces\UserService;
use App\Modules\Services\Acl\User\UserService as ExternalUserService;

class UserServiceAdapter implements UserService
{
    public function __construct(private ExternalUserService $userService){}

    public function getById(int $id): ?array {
        return $this->userService->getById($id);
    }
}
