<?php

namespace App\Modules\Api\Domain\UseCases\FormField\GetFormFieldFormEdit;

use App\Modules\Api\Domain\Entities\Form\FormRepository;
use App\Modules\Api\Domain\Interfaces\Repository;
use App\Modules\Api\Domain\Interfaces\RepositoryFactory;
use App\Modules\Api\Domain\UseCases\Form\GetFormEdit\GetFormEdit;


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