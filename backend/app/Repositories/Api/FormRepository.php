<?php

declare(strict_types=1);
namespace App\Repositories\Api;

use Illuminate\Support\Facades\DB;
use App\Models\Form;

class FormRepository extends AbstractRepository
{
    public function __construct() {
        parent::__construct(new Form);
    }
}