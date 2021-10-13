<?php

namespace App\Exception;

use Symfony\Component\HttpKernel\Exception\HttpException;

class MoveNonEmptySpot extends HttpException
{
    protected int $httpStatusCode = 409; // Conflict
    protected $message = 'Move was made on a non empty spot';

    public function __construct()
    {
        parent::__construct($this->httpStatusCode, $this->message);
    }
}
