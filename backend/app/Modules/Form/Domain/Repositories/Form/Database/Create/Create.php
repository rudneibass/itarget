<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database\Create;

use App\Modules\Form\Domain\Entities\Form\Form;
use App\Modules\Form\Domain\Entities\Form\FormDto;

trait Create {
    public function create(Form $form): ?Form {
        $newRecord = $this->formModelAdapter->create($form->toArray());
        $newRecord = $this->formModelAdapter->find((int)$newRecord['id']);
        return 
        new Form(
            new FormDto([
                'id' => $newRecord['id'],
                'name' => $newRecord['name'],
                'attributes' => $newRecord['attributes']
            ])
        );
    }
}