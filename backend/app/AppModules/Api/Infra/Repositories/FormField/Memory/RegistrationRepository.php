<?php declare(strict_types=1);

namespace App\AppModules\Api\Infra\Repositories\Registration\Memory;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationDto;
use App\AppModules\Api\Infra\Models\EloquentORM\Registration as RegistrationModel;
use App\AppModules\Api\Domain\Entities\Registration\RegistrationRepository as IRegistrationRepository;
use Illuminate\Support\Facades\DB;

class RegistrationRepository implements IRegistrationRepository {
    private $model;

    public function __construct() {
        $this->model = new RegistrationModel();
    }

    public function get( string $id ) : Registration {
        return new Registration(
            new RegistrationDto([
                'id' => '1',
                'event_id' => '1', 
                'name' => 'Joe Doe',
                'email' => 'joe.doe@email.com',
                'cpf' => '123.456.789-10' 
            ])
        );
    }

    public function list(): array {
        $registrations = [];
        $count = 1;
        while ($count < 11){
            $registrations[] = 
            new Registration(
                new RegistrationDto([
                    'id' => $count,
                    'event_id' => '1', 
                    'name' => 'Joe Doe '.$count,
                    'email' => 'joe'.$count.'.doe@email.com',
                    'cpf' => $count.'23.456.789-10' 
                ]
            ));
            $count++;
        }

        return $registrations;
    }


    public function create(Registration $registration): ?Registration{
        return 
        new Registration(
            new RegistrationDto([
                'id' => '1',
                'event_id' => '1',
                'name' => 'Joe Doe',
                'email' => 'joe.doe@email.com',
                'cpf' => '123.456.789-10' 
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

        foreach( DB::select($query) as $item ) {
            $registrations[] = 
            new Registration(
                new RegistrationDto([
                    'name' => $item->name,
                    'email' => $item->email,
                    'cpf' => $item->cpf,
                    'id' => $item->id,
                    'event_id' => $item->event_id
                ]
            ));
        }

        return $registrations;
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