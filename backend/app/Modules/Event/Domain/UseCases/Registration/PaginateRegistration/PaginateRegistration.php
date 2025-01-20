<?php

namespace App\Modules\Event\Domain\UseCases\Registration\PaginateRegistration;

use App\Modules\Event\Domain\entities\Registration\RegistrationRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateRegistration {

    private $repository;

    public function __construct(RegistrationRepository $repository){
        $this->repository = $repository;
    }

    public function execute(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        
        $params['limit'] = $perPage;
        $params['offset'] = ($page - 1) * $perPage;
        
        $registrations = 
        array_map(function($registration){
            return [
                'name' => $registration->name,
                'display_name' => $registration->displayName,
                'email' => $registration->email,
                'cpf' => $registration->cpf,
                'id' => $registration->id,
                'event_id' => $registration->eventId,
                'published' => $registration->published
            ];
        }, $this->repository->findAllByParams($params));

        return 
        new LengthAwarePaginator($registrations, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}