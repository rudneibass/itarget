<?php
 namespace App\AppModules\Form\Domain\Interfaces;

 interface RepositoryFactory {
    public function getRepository(string $id) : Repository;
 }