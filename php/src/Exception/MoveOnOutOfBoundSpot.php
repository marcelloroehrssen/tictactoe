<?php

namespace App\Exception;

use Symfony\Component\HttpKernel\Exception\HttpException;

class MoveOnOutOfBoundSpot extends HttpException
{
    protected int $httpStatusCode = 400; // Bad request
    protected $message = 'Move was made on a spot that is not part of the game field';

    public function __construct()
    {
        parent::__construct($this->httpStatusCode, $this->message);
    }
}
