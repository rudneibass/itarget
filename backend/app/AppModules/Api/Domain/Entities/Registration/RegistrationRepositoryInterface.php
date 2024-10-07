<?php declare(strict_types=1);

namespace App\AppModules\Api\Domain\Entities\Registration;

use App\AppModules\Api\Domain\Entities\Registration\Registration;
use App\AppModules\Api\Domain\Interfaces\Repository;

interface RegistrationRepositoryInterface extends Repository {
    public function create(Registration $registration): ?Registration;
    public function list(): array;
    public function get(string $id): Registration;
    public function delete(string $id): int;
    public function update(Registration $registration, string $id): int;
    public function findAllByParams(array $params = []): ?array;
}