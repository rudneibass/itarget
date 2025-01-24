<?php
namespace App\Modules\Form\Domain\Repositories\Factory;

use App\Modules\Form\Domain\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Domain\Interfaces\Database;
use App\Modules\Form\Domain\Interfaces\Model;
use Exception;

class RepositoryFactory {
    private $repositories;

    public function __construct(private Model $modelAdapter, private Database $databaseAdapter) {
        $this->repositories = [
            'form' => new FormRepository($modelAdapter,$databaseAdapter),
        ];
    }

    public function getRepository(string $idRepository) {
        if (isset($this->repositories[$idRepository])) {
            return $this->repositories[$idRepository];
        }
        throw new Exception("Repositório para '$idRepository' não encontrado.");
    }
}
