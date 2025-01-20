<?php

namespace App\Modules\Form\Infra\Controllers\Form;

use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\UseCases\Form\GetFormCreate\GetFormCreate;
use App\Modules\Form\Infra\Controllers\BaseController;
use Illuminate\Http\Request;

class GetFormCreateController extends BaseController {
    public function index(Request $request) {
        return $this->executeAction(function() use ($request){
            $useCase = new  GetFormCreate(new FormRepository ); 
            return $useCase->execute($request->get('form_name', null));
        });
    }
}
