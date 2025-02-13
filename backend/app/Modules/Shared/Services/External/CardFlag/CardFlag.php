<?php

namespace App\Modules\Shared\Services\External\CardFlag;

use Exception;

class CardFlag
{

    public function get(int $number): string
    {
        switch ($number) {
            case (bool) preg_match('/^(636368|438935|504175|451416|636297)/', $number):
                $flag = 'elo';
                break;

            case (bool) preg_match('/^(606282)/', $number):
                $flag = 'hipercard';
                break;

            case (bool) preg_match('/^(5067|4576|4011)/', $number):
                $flag = 'elo';
                break;

            case (bool) preg_match('/^(3841)/', $number):
                $flag = 'hipercard';
                break;

            case (bool) preg_match('/^(6011)/', $number):
                $flag = 'discover';
                break;

            case (bool) preg_match('/^(622)/', $number):
                $flag = 'discover';
                break;

            case (bool) preg_match('/^(301|305)/', $number):
                $flag = 'diners';
                break;

            case (bool) preg_match('/^(34|37)/', $number):
                $flag = 'amex';
                break;

            case (bool) preg_match('/^(36,38)/', $number):
                $flag = 'diners';
                break;

            case (bool) preg_match('/^(64,65)/', $number):
                $flag = 'discover';
                break;

            case (bool) preg_match('/^(50)/', $number):
                $flag = 'aura';
                break;

            case (bool) preg_match('/^(35)/', $number):
                $flag = 'jcb';
                break;

            case (bool) preg_match('/^(60)/', $number):
                $flag = 'hipercard';
                break;

            case (bool) preg_match('/^(4)/', $number):
                $flag = 'visa';
                break;

            case (bool) preg_match('/^(5)/', $number):
                $flag = 'mastercard';
                break;
            default:
                throw new Exception('Cartao invalido!');
        }

        return strtoupper($flag);
    }
}