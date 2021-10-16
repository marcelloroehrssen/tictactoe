<?php

namespace App\Response;

use App\Entity;

class Game
{
    public int $id;

    public string $player1;

    public string $player2;

    public array $moves = [];

    public ?int $winner = null;

    public ?bool $draw = null;

    public ?int $nextToMove = null;

    public static function from(Entity\Game $game): self
    {
        $response = new self();
        $response->id = $game->getId();
        $response->player1 = $game->getPlayer1();
        $response->player2 = $game->getPlayer2();
        $response->moves = $game->getMoves();
        $response->draw = $game->isDraw();
        $response->nextToMove = $game->getNextToMove();
        $response->winner = $game->getWinner();

        return $response;
    }
}
