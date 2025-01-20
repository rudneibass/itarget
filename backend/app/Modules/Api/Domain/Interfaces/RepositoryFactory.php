<?php
 namespace App\Modules\Api\Domain\Interfaces;

 interface RepositoryFactory {
    public function getRepository(string $id) : Repository;
 }