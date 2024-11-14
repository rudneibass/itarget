<?php
namespace App\AppModules\Form\Infra\Repositories\Factory;

use App\AppModules\Form\Domain\Interfaces\Repository;
use App\AppModules\Form\Domain\Interfaces\RepositoryFactory as InterfacesRepositoryFactory;
use App\AppModules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\AppModules\Form\Infra\Repositories\Registration\Database\RegistrationRepository;
use Exception;

class RepositoryFactory implements InterfacesRepositoryFactory{
    private $repositories;

    public function __construct() {
        $this->repositories = [
            'form' => new FormRepository(),
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
