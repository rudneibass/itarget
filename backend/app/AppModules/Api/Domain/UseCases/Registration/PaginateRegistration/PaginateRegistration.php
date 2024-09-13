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
        $registrations = $this->repository->findAllByParams($params);
        $list = [];

        foreach ($registrations as $item) {
            $registration = [];
            $registration['name'] = $item->name;
            $registration['email'] = $item->email;
            $registration['cpf'] = $item->cpf;
            $registration['id'] = $item->id;
            $registration['event_id'] = $item->eventId;
            $list[] = $registration;
        }

        return 
        new LengthAwarePaginator($list, $total, $perPage, $page, [
            'path' => request()->url(),
            'query' => request()->query(),
        ]);
    }
}