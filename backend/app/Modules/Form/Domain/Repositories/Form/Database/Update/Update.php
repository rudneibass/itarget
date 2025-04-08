<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\Update;

use App\Modules\Form\Domain\Entities\Form\Form;

trait Update {
    public function update(Form $form): bool {
        $formToUpdate = $this->formModelAdapter->find((int)$form->id);
        $formToUpdate['name'] = $form->name;
        $formToUpdate['attributes'] = $form->attributes;
        return $this->formModelAdapter->update((int)$form->id, $formToUpdate);
    }
}