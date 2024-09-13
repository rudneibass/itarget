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
        $registrations = [];
        foreach( $this->model::all() as $item ) {
            $dto = new RegistrationDTO([
                'name' => $item->name,
                'email' => $item->email,
                'cpf' => $item->cpf,
                'id' => $item->id,
                'event_id' => $item->event_id
            ]);
            $registrations[] = new Registration($dto);
        }

        return $registrations;
    }


    public function create(Registration $registration): bool {
        $this->model::query()
        ->create([
            'event_id' => $registration->eventId,
            'name' => $registration->name,
            'email' => $registration->email,
            'cpf' => $registration->cpf,
        ]);

        return true;
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
            $dto = new RegistrationDTO([
                'name' => $item->name,
                'email' => $item->email,
                'cpf' => $item->cpf,
                'id' => $item->id,
                'event_id' => $item->event_id
            ]);
            $registrations[] = new Registration($dto);
        }

        return $registrations;
    }

    public function update(Registration $registration, string $id): int {
        return $this->model::findOrFail($id)->update($registration->toArray());
    }

    public function delete(string $id): int {
        return $this->model::findOrFail($id)->delete();
    }
}