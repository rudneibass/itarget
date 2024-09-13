<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\entities\Registration;

use App\AppModules\Api\Domain\Entities\Registration\Registration;

interface RegistrationRepository {
    public function save(Registration $registration): bool;
    public function list(): array;
}  

/*
    public function list(): ?Collection;
    public function paginate(int $itemsPerPage): ?LengthAwarePaginator;
    public function getById(int $id): ?Model;
    public function update(array $request, int $id):int;
    public function delete(int $id):int;
*/