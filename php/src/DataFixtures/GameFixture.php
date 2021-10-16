<?php

namespace App\DataFixtures;

use App\Entity\Game;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;


/**
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
class GameFixture extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        /** Game no move */
        $game1 = new Game(
            player1: "player_guest_1",
            player2: "player_guest_2",
        );
        $manager->persist($game1);

        /** Game won by 1 */
        $game2 = new Game(
            player1: "player_guest_1",
            player2: "player_guest_2",
        );
        $game2->move(4);
        $game2->move(1);
        $game2->move(2);
        $game2->move(3);
        $game2->move(6);
        $manager->persist($game2);

        /** Game won by 2 */
        $game2 = new Game(
            player1: "player_guest_1",
            player2: "player_guest_2",
        );
        $game2->move(0);
        $game2->move(4);
        $manager->persist($game2);


        $manager->flush();
    }
}
