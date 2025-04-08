<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\List;

trait ListForm {
    public function list(): array {
        return $this->formModelAdapter->all();
    }
}