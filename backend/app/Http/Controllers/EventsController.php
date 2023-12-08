<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Http\Requests\EventsStoreRequest;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $events = Event::all();
            return response()->json(['data' => $events]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Http\Requests\EventsStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventsStoreRequest $request)
    {
        try {

            #$request_data = $request->all(); 
            #$request_data['status'] = $request->has('status');
            #$new_object = Event::create($request_data);

            $event = Event::create($request->all());
            return response()->json(['data' => $event], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        try {
            return response()->json(['data' => $event]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Http\Requests\UpdateEventRequest  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        try {
            $event->update($request->all());
            return response()->json(['data' => $event]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        try {
            $event->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
