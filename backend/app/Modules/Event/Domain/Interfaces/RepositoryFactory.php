<?php
 namespace App\Modules\Event\Domain\Interfaces;

 interface RepositoryFactory {
    public function getRepository(string $id) : Repository;
 }