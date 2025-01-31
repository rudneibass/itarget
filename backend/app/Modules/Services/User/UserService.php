<?php

namespace App\Modules\Services\User;

use App\Modules\Acl\Controllers\User\UserController;


class UserService 
{
    protected $controller;

    public function __construct(){
        $this->controller = new UserController();
    }

    public function getById(int $id)
    {
        return $this->controller->getById($id)->getData(true);
    }   
}
