<?php 
namespace App\Services\Registration;

use App\Repositories\RegistrationRepository;

class RuleExistingRegistrationEvent
{
    public array $registration;
    public string $message= 'Endereço de email ainda não está inscrito nesse evento!';
    public bool $valid = true;
    public bool $invalid = false;
    
    public function __construct(array $registration){
        $this->registration = $registration;

        $registrationRepository = new RegistrationRepository;
        
        if ($registrationRepository->findByEMailAndEventId($registration['email'], $registration['event_id'])) {
            $this->message = 'Incrição já realizada para esse evento!';
            $this->invalid = true;
            $this->valid = false;
        }
    }
}
