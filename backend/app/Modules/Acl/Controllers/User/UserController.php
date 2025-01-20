<?php

namespace App\Modules\Acl\Controllers\User;


use Illuminate\Http\Request;

use App\Modules\Acl\Controllers\BaseController;
use App\Modules\Acl\Requests\User\UserCreateRequest;
use App\Modules\Acl\Services\User\UserService;

class UserController extends BaseController
{
    protected $service;
    protected $createRequest;
    protected $updateRequest;
    
    public function __construct(){
        $this->service = new UserService;
        $this->createRequest = new UserCreateRequest;
    }

    public function findAllByParams(Request $request){
        return $this->execute(function() use ($request){
            return $this->service->findAllByParams($request->all());
        });
    }

    public function search(Request $request){
        return $this->execute(function() use ($request){
            return $this->service->search($request->all());
        });
    }
}
