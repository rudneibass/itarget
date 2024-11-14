<?php
 namespace App\AppModules\Event\Domain\Interfaces;

 interface RepositoryFactory {
    public function getRepository(string $id) : Repository;
 }