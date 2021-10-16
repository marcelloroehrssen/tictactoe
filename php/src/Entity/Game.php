<?php

namespace App\Entity;

use App\Exception\MoveNonEmptySpot;
use App\Exception\MoveOnDrawGame;
use App\Exception\MoveOnOutOfBoundSpot;
use App\Exception\MoveOnWonGame;
use App\Repository\GameRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GameRepository::class)
 */
class Game
{
    private array $combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6],         // obliques
    ];

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $player1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $player2;

    /**
     * @ORM\Column(type="array")
     */
    private array $moves = [];

    /**
     * Game constructor.
     */
    public function __construct(string $player1, string $player2)
    {
        $this->player1 = $player1;
        $this->player2 = $player2;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getPlayer1(): string
    {
        return $this->player1;
    }

    public function getPlayer2(): string
    {
        return $this->player2;
    }

    public function getMoves(): array
    {
        return $this->moves;
    }

    public function isDraw(): bool
    {
        return 9 === count($this->moves);
    }

    public function getNextToMove(): int
    {
        return 0 === count($this->moves) % 2 ? 1 : 2;
    }

    /**
     * @throws MoveOnDrawGame
     */
    public function move(int $index): self
    {
        if ($index > 9) {
            throw new MoveOnOutOfBoundSpot();
        }

        if ($this->isDraw()) {
            throw new MoveOnDrawGame();
        }

        if ($this->getWinner()) {
            throw new MoveOnWonGame();
        }

        if (!empty($this->moves[$index])) {
            throw new MoveNonEmptySpot();
        }

        $this->moves[$index] = $this->getNextToMove();

        return $this;
    }

    public function getWinner()
    {
        return max(array_map(function ($combo) {
            [$a, $b, $c] = $combo;
            if (empty($this->moves)) {
                return null;
            }
            if (isset($this->moves[$a], $this->moves[$b], $this->moves[$c])
                && $this->moves[$a] === $this->moves[$b]
                && $this->moves[$b] === $this->moves[$c]) {
                return $this->moves[$a];
            }

            return null;
        }, $this->combos));
    }
}
