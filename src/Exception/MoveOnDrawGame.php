<?php

namespace App\Exception;

use Symfony\Component\HttpKernel\Exception\HttpException;

class MoveOnDrawGame extends HttpException
{
    protected int $httpStatusCode = 403; // Forbidden
    protected $message = 'Move was made in a game that is already declared draw';

    public function __construct()
    {
        parent::__construct($this->httpStatusCode, $this->message);
    }
}
