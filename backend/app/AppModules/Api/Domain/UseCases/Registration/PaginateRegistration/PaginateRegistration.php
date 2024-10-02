<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\PaginateRegistration;

use App\AppModules\Api\Domain\entities\Registration\RegistrationRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class PaginateRegistration {

    private $repository;

    public function __construct(RegistrationRepositoryInterface $registrationRepository){
        $this->repository = $registrationRepository;
    }


    public function execute(array $params = []): ?LengthAwarePaginator {
        $perPage = isset($params['paginate']) && !empty($params['paginate']) ? (int)$params['paginate'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $total = count($this->repository->findAllByParams($params));
        $offset = ($page - 1) * $perPage;
        $params['limit'] = $perPage;
        $params['offset'] = $offset;
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