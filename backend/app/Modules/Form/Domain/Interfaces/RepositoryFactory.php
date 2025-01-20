<?php
 namespace App\Modules\Form\Domain\Interfaces;

 interface RepositoryFactory {
    public function getRepository(string $id) : Repository;
 }