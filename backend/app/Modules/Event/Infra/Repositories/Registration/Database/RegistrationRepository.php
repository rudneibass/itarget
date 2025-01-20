<?php declare(strict_types=1);

namespace App\Modules\Event\Infra\Repositories\Registration\Database;

use App\Modules\Event\Domain\Entities\Registration\Registration;
use App\Modules\Event\Domain\Entities\Registration\RegistrationDto;
use App\Modules\Event\Domain\Entities\Registration\RegistrationRepository as IRegistrationRegistration;
use App\Modules\Event\Infra\Models\EloquentORM\Registration as RegistrationModel;
use Illuminate\Support\Facades\DB;

class RegistrationRepository implements IRegistrationRegistration {
    private $model;

    public function __construct() {
        $this->model = new RegistrationModel();
    }

    public function get( string $id ) : Registration {
        $registration = $this->model::find($id);
        return new Registration(
            new RegistrationDto([
                'id' => $registration->id,
                'name' => $registration->name,
                'email' => $registration->email,
                'cpf' => $registration->cpf,
                'event_id' => $registration->event_id,
                'registration_id' => $registration->registration_id,
                'published' => $registration->published ? true : false
            ])
        );
    }

    public function list(): array {
      return array_map(function($registration) {
            return new RegistrationDto([
                'name' => $registration['name'],
                'email' => $registration['email'],
                'cpf' => $registration['cpf'],
                'id' => $registration['id'],
                'event_id' => $registration['event_id'],
                'registration_id' => $registration['registration_id'],
                'published' => $registration['published'] ? true : false
            ]);
        }, $this->model::all()->toArray());
    }


    public function create(Registration $registration): ?Registration {
        $registrationModel = $this->model::
        create([
            'event_id' => $registration->eventId,
            'name' => $registration->name,
            'email' => $registration->email,
            'cpf' => $registration->cpf,
            'registration_id' => $registration->registrationId,
            'published' => $registration->published ? true : false
        ]);

        return new Registration(
            new RegistrationDto([
                'id' => $registrationModel->id,
                'event_id' => $registrationModel->event_id,
                'name' => $registrationModel->name,
                'email' => $registrationModel->email,
                'cpf' => $registrationModel->cpf,
                'registration_id' => $registrationModel->registrationId,
                'published' => $registration->published ? true : false
            ])
        );
    }

    public function findAllByParams(array $params = []): ?array {
        $query = "SELECT * 
            FROM 'registrations' 
            WHERE 1 = 1"
            .(isset($params['id']) && !empty($params['id']) ? " AND id = {$params['id']}" : "" )
            .(isset($params['name']) && !empty($params['name']) ? " AND name like '%{$params['name']}%'" : "" )
            .(isset($params['email']) && !empty($params['email']) ? " AND email like '%{$params['email']}%'" : "" )
            .(isset($params['order']) && !empty($params['order']) ? " ORDER BY {$params['order']}" : " ORDER BY id" )
            .(isset($params['limit']) && !empty($params['limit']) ? " LIMIT {$params['limit']}" : "" )
            .(isset($params['offset']) && !empty($params['offset']) ? " OFFSET {$params['offset']}" : "" );

        return array_map(function($item){
            return 
            new Registration(
                new RegistrationDto([
                    'id' => (string) $item->id,
                    'event_id' => (string) $item->event_id,
                    'registration_id' => (string) $item->registration_id,
                    'cpf' => (string) $item->cpf,
                    'name' => $item->name,
                    'email' => $item->email,
                    'published' => $item->published ? true : false
                ]
            ));
        }, DB::select($query));
    }

    public function findAllBySingleParam(string $param): ?array {
        $query = "SELECT * 
            FROM 'registrations' 
            WHERE id = {$param}
            OR name like '%{$param}%'
            OR email like '%{$param}%' 
            ORDER BY name";
            
        return array_map(function($item){
            return 
            new Registration(
                new RegistrationDto([
                    'id' => (string) $item->id,
                    'event_id' => (string) $item->event_id,
                    'registration_id' => (string) $item->registration_id,
                    'cpf' => (string) $item->cpf,
                    'name' => $item->name,
                    'email' => $item->email,
                    'published' => $item->published ? true : false
                ]
            ));
        }, DB::select($query));
    }

    public function update(Registration $registration): bool {
        $registrationModel = RegistrationModel::find($registration->id);        
        $registrationModel->name = $registration->name;
        $registrationModel->email = $registration->email;
        $registrationModel->cpf = $registration->cpf;
        $registrationModel->event_id = $registration->eventId;
        $registrationModel->registration_id = $registration->registrationId;
   
        return $registrationModel->save();
   }
   
    public function delete(string $id): int {
        return $this->model::findOrFail($id)->delete();
    }
}