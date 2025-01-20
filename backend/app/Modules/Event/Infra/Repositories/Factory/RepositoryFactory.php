<?php
namespace App\Modules\Event\Infra\Repositories\Factory;

use App\Modules\Event\Domain\Interfaces\Repository;
use App\Modules\Event\Domain\Interfaces\RepositoryFactory as InterfacesRepositoryFactory;
use App\Modules\Event\Infra\Repositories\Registration\Database\RegistrationRepository;
use Exception;

class RepositoryFactory implements InterfacesRepositoryFactory{
    private $repositories;

    public function __construct() {
        $this->repositories = [
            'registration' => new RegistrationRepository(),
            '/api/registration/get' => new RegistrationRepository(),
            '/api/registration/list' => new RegistrationRepository(),
        ];
    }

    public function getRepository(string $idRepository): Repository {
        if (isset($this->repositories[$idRepository])) {
            return $this->repositories[$idRepository];
        }
        throw new Exception("Repositório para '$idRepository' não encontrado.");
    }
}
