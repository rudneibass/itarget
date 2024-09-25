<?php declare(strict_types=1);

namespace App\AppModules\Api\Infra\Repositories\Registration\Database;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationDTO;
use App\AppModules\Api\Infra\Models\EloquentORM\Registration as RegistrationModel;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepositoryInterface;
use Illuminate\Support\Facades\DB;

class RegistrationRepository implements RegistrationRepositoryInterface {
    private $model;

    public function __construct() {
        $this->model = new RegistrationModel();
    }

    public function get( string $id ) : Registration {
        $registration = $this->model::find($id);
        return new Registration(
            new RegistrationDTO([
                'id' => $registration->id,
                'name' => $registration->name,
                'email' => $registration->email,
                'cpf' => $registration->cpf,
                'event_id' => $registration->event_id,
            ])
        );
    }

    public function list(): array {
      return array_map(function($registration) {
            return new RegistrationDTO([
                'name' => $registration['name'],
                'email' => $registration['email'],
                'cpf' => $registration['cpf'],
                'id' => $registration['id'],
                'event_id' => $registration['event_id']
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
        ]);

        return new Registration(
            new RegistrationDTO([
                'id' => $registrationModel->id,
                'event_id' => $registrationModel->event_id,
                'name' => $registrationModel->name,
                'email' => $registrationModel->email,
                'cpf' => $registrationModel->cpf,
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
                new RegistrationDTO([
                    'name' => $item->name,
                    'email' => $item->email,
                    'cpf' => $item->cpf,
                    'id' => $item->id,
                    'event_id' => $item->event_id
                ]
            ));
        }, DB::select($query));
    }

    public function update(Registration $registration, string $id): int {
        return $this->model::findOrFail($id)->update($registration->toArray());
    }

    public function delete(string $id): int {
        return $this->model::findOrFail($id)->delete();
    }
}