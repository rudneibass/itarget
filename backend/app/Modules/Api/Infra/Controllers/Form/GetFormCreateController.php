<?php

namespace App\Modules\Api\Infra\Controllers\Form;

use App\Modules\Api\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\Modules\Api\Infra\Controllers\BaseController;
use App\Modules\Api\Infra\Repositories\Form\Database\FormRepository;
use Illuminate\Http\Request;

class GetFormCreateController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new  GetFormCreate(new FormRepository); 
            return $useCase->execute($request->get('form_name', null));
        });
    }
}
