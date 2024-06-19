<?php 
namespace App\Services\Registration;

use App\Repositories\EventRepository;
use App\Repositories\RegistrationRepository;

class RuleConflictBetweenEventData
{
    public array $registration;
    public string $message = 'Não conflito de datas entre eventos.';
    public bool $valid  = true;
    public bool $invalid = false;

    public function __construct(array $registration)
    {
        $eventRepository = new EventRepository;
        $registrationRepository = new RegistrationRepository;

        $event_that_will_receive_new_registration = $eventRepository->get((int)$registration['event_id']);

        $existing_registrations_event_ids = array_filter($registrationRepository->findByEMail($registration['email']), function($item) use ($event_that_will_receive_new_registration){
           return $item['event_id'] != $event_that_will_receive_new_registration->id; 
        });

        foreach ($eventRepository->findByIds(array_column($existing_registrations_event_ids, 'id')) as $event) {
            if ($event_that_will_receive_new_registration->start_date <= $event->end_date) {
               if($event_that_will_receive_new_registration->end_date >= $event->start_date){
                   $this->message = "Conflito de datas com o evento {$event->name} que sera realizado entre {$event->start_date} e {$event->start_date}";
                   $this->valid  = false;
                   $this->invalid = true;
               }
            }
        }
    }
}
