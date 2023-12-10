<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Http\Requests\RegistrationsStoreRequest;
use App\Services\RegistrationService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class RegistrationsController extends Controller
{

    protected $registrationService;
    
    public function __construct(RegistrationService $registrationService){
        $this->registrationService = $registrationService;
    }

   /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $registrations = Registration::all();
            return response()->json(['data' => $registrations]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Http\Requests\RegistrationsStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    /*public function store(RegistrationsStoreRequest $request)
    {
        try {

            #$request_data = $request->all(); 
            #$request_data['status'] = $request->has('status');
            #$new_object = Registration::create($request_data);

            $registration = Registration::create($request->all());
            return response()->json(['data' => $registration], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }*/

    public function store(RegistrationsStoreRequest $request)
    {
        try {  
            
            $data = $request->validated();            
            $registration = $this->registrationService->createRegistration($data);
            return response()->json(['data' => $registration], 201);

         } catch (ValidationException $e) {

            return response()->json(['errors' => $e->errors()], 422);   

        } catch (\Exception $e) {    

            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

   
    /**
     * @param  \App\Models\Registration  $registration
     * @return \Illuminate\Http\Response
     */
    public function show(Registration $registration)
    {
        try {
            return response()->json(['data' => $registration]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Http\Requests\Request $request
     * @param  \App\Models\Event  $registration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Registration $registration)
    {
        try {
            $registration->update($request->all());
            return response()->json(['data' => $registration]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Models\Registration  $registration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Registration $registration)
    {
        try {
            $registration->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
