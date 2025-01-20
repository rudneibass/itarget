<?php
namespace App\Modules\Form\Infra\Repositories\Factory;

use App\Modules\Form\Domain\Interfaces\Repository;
use App\Modules\Form\Domain\Interfaces\RepositoryFactory as InterfacesRepositoryFactory;
use App\Modules\Form\Infra\Repositories\Form\Database\FormRepository;
use App\Modules\Form\Infra\Repositories\Registration\Database\RegistrationRepository;
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
