<?php declare(strict_types=1);

namespace App\Modules\Event\Domain\Entities\Registration;

use App\Modules\Event\Domain\Entities\Registration\Registration;
use App\Modules\Event\Domain\Interfaces\Repository;

interface RegistrationRepository extends Repository {
    public function create(Registration $registration): ?Registration;
    public function list(): array;
    public function get(string $id): Registration;
    public function delete(string $id): int;
    public function update(Registration $registration): bool;
    public function findAllByParams(array $params = []): ?array;
}