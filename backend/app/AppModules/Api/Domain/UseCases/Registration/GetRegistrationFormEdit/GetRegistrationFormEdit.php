<?php

namespace App\AppModules\Api\Domain\UseCases\Registration\GetRegistrationFormEdit;

use App\AppModules\Api\Domain\Entities\Form\FormRepository;
use App\AppModules\Api\Domain\Interfaces\Repository;
use App\AppModules\Api\Domain\Interfaces\RepositoryFactory;
use App\AppModules\Api\Domain\UseCases\Form\GetFormEdit\GetFormEdit;


class GetRegistrationFormEdit {
    private $repository;
    private $formRepository;
    private $repositoryFactory;

    public function __construct (
        Repository $repository,
        FormRepository $formRepository, 
        RepositoryFactory $repositoryFactory
    )
    {
        $this->formRepository = $formRepository;
        $this->repositoryFactory = $repositoryFactory;
        $this->repository = $repository;
    }

    public function execute(array $request){
        
        $useCase = new GetFormEdit($this->formRepository, $this->repositoryFactory, $this->repository);
        $form = $useCase->execute($request);
        return $form;
    }
}