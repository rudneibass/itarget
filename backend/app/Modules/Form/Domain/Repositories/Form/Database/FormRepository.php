<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Form\Database;

use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Repositories\Form\Database\GetByName\GetByName;
use App\Modules\Form\Domain\Repositories\Form\Database\GetById\GetById;
use App\Modules\Form\Domain\Repositories\Form\Database\FindAllByParams\FindAllByParams;
use App\Modules\Form\Domain\Repositories\Form\Database\Create\Create;
use App\Modules\Form\Domain\Repositories\Form\Database\List\ListForm;
use App\Modules\Form\Domain\Repositories\Form\Database\Update\Update;

class FormRepository {
    use GetByName;
    use GetById;
    use FindAllByParams;
    use Create;
    use Update;
    use ListForm;

    public function __construct(private Model $formModelAdapter, private Database $databaseAdapter) {}
}