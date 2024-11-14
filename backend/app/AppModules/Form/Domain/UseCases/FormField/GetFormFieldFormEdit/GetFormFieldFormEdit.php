<?php

namespace App\AppModules\Form\Domain\UseCases\FormField\GetFormFieldFormEdit;

use App\AppModules\Form\Domain\Entities\Form\FormRepository;
use App\AppModules\Form\Domain\Interfaces\Repository;
use App\AppModules\Form\Domain\Interfaces\RepositoryFactory;
use App\AppModules\Form\Domain\UseCases\Form\GetFormEdit\GetFormEdit;


class GetFormFieldFormEdit {
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