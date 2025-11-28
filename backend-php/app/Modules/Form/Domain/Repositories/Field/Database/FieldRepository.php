<?php declare(strict_types=1);

namespace App\Modules\Form\Domain\Repositories\Field\Database;

use App\Modules\Form\Domain\Interfaces\Model;
use App\Modules\Form\Domain\Interfaces\Database;

use App\Modules\Form\Domain\Repositories\Field\Database\GetByName\GetByName;
use App\Modules\Form\Domain\Repositories\Field\Database\GetById\GetById;
use App\Modules\Form\Domain\Repositories\Field\Database\FindAllByParams\FindAllByParams;
use App\Modules\Form\Domain\Repositories\Field\Database\Create\Create;
use App\Modules\Form\Domain\Repositories\Field\Database\Delete\Delete;
use App\Modules\Form\Domain\Repositories\Field\Database\GetFormCreateByName\GetFormCreateByName;
use App\Modules\Form\Domain\Repositories\Field\Database\List\ListField;
use App\Modules\Form\Domain\Repositories\Field\Database\Update\Update;

class FieldRepository {
    use GetByName;
    use GetById;
    use FindAllByParams;
    use Create;
    use Update;
    use Delete;
    use ListField;
    use GetFormCreateByName;

    public function __construct(private Model $fieldModelAdapter, private Database $databaseAdapter){}
}
