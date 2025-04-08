<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database\Delete;

trait Delete {
    public function delete(string $id): int {
        return 1;
    }
}