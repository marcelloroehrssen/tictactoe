<?php

namespace App\Controller;

use App\Entity\Game;
use App\Response\Game as GameResponse;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/game')]
class GameController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/{id}', name: 'game_status', methods: 'GET')]
    #[ParamConverter('game')]
    public function status(Game $game): Response
    {
        return $this->json(GameResponse::from($game));
    }

    #[Route('/{id}', name: 'game_move', methods: 'PUT')]
    #[ParamConverter('game')]
    public function move(Game $game, Request $request): Response
    {
        $game->move($request->get('move'));
        $this->entityManager->flush();

        return $this->json(GameResponse::from($game));
    }

    #[Route(name: 'game_start', methods: 'POST')]
    public function start(Request $request): Response
    {
        $game = new Game(
            player1: $request->request->get('player1', 'guest'.rand(0, 1000)),
            player2: $request->request->get('player2', 'guest'.rand(0, 1000)),
        );

        $this->entityManager->persist($game);
        $this->entityManager->flush();

        return $this->json(GameResponse::from($game));
    }
}
