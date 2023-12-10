<?php 
namespace App\Services;

use App\Models\Registration;
use App\Models\Event;
use Illuminate\Validation\ValidationException;
use Exception;

class RegistrationService
{
    public function createRegistration(array $data){
        
        # 1. Verifica se existe inscrição para o mesmo evento
        $existingRegistrationEvent = Registration::where('email', $data['email'])
        ->where('event_id', $data['event_id'])
        ->get()
        ->first();
        if ($existingRegistrationEvent) {
            throw ValidationException::withMessages([
                'event_id' => 'Incrição já realizada para esse evento!',
            ]);
        }

        # 2. Obtém o objeto do evento para a nova inscrição 
        $newEvent = Event::find( $data['event_id']);

        # 3. Obtém a lista de todas as incrições que o email já possui
        $registrationsAnotherEvent = Registration::where('email', $data['email'])
            ->where('event_id', '<>', $newEvent->id)
            ->get();

        # 4. Obtém um array com os id's dos eventos que o email possui  
        $event_ids = $registrationsAnotherEvent->pluck('event_id')->unique()->toArray();
        $events = Event::whereIn('id', $event_ids)->get();

        # 5. Percorre a lista e eventos e verifica se existe conflito de datas 
        foreach ($events as $event) {
            if ($newEvent->start_date <= $event->end_date && $newEvent->end_date >= $event->start_date) {

                throw ValidationException::withMessages([
                    'event_id' => 'Conflito de datas encontrado.',
                ]);
            }
        }

           

        
        $registration = Registration::create($data);

        return $registration;
    }
}
