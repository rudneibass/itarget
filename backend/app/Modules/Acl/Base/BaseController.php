<?php

namespace App\Modules\Acl\Base;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

use Exception;

abstract class BaseController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $service;
    protected $createRequest;
    protected $updateRequest;

    protected  $responseData;
    protected int $responseHttpStatus;

    protected function execute(callable $action){
        try{
            $this->responseData = $action();
            $this->responseHttpStatus = 200;

        }catch (ValidationException $e) {
            $this->responseData = $e->errors();
            $this->responseHttpStatus = 422;

        }catch (Exception $e){
            $this->responseData = $e->getMessage();
            $this->responseHttpStatus = 500;
        }

        return response()->json(
            $this->responseData,
            $this->responseHttpStatus
        );
    }

    public function getAll(){
       return $this->execute(function(){
            return $this->service->getAll();
        });
    }

    public function paginate(int $itemsPerPage){
        return $this->execute(function() use ($itemsPerPage){
             return $this->service->paginate($itemsPerPage);
         });
     }

    public function getById($id){
        return $this->execute(function() use ($id){
            return $this->service->getById((int)$id);
        });
    }

    public function update(Request $request, int $id){
        return $this->execute(function() use ($request, $id){
            $requestData = $request->all();
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            return $this->service->update($requestData, $id);
        });  
    }
    
    public function delete(int $id){
        return $this->execute(function() use ($id){
            return $this->service->delete($id);
        });
    }

    public function create(Request $request)
    {
        return $this->execute(function() use ($request) {
            $requestData = $request->all();
            if(isset($this->createRequest)){
                $this->createRequest->merge($request->all());
                $this->createRequest->validate($this->createRequest->rules());
            }
            return $this->service->create($requestData);
        });
    }

    public function getDoc(){
        return $this->execute(function(){
            return $this->service->getDoc();
        });
    }

    public function getFormCreate($formName){
        return $this->execute(function() use ($formName){
            return $this->service->getFormCreate($formName);
        });
    }

    public function getFormEdit($formName, $id){
        return $this->execute(function() use ($formName, $id){
            return $this->service->getFormEdit($formName, $id);
        });
    }
}
