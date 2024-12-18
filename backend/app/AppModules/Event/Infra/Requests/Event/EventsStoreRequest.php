<?php

namespace App\AppModules\Event\Infra\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class EventsStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ];
    }
}
