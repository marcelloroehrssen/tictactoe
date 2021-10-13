<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class EndpointTest extends WebTestCase
{
    public function testCreate(): void
    {
        $client = static::createClient();

        $client->request(method:'POST', uri: '/game');
        $response = $client->getResponse()->getContent();
        $data = json_decode($response, true);

        $this->assertResponseIsSuccessful();
        self::assertStringContainsString('guest', $data['player1']);
        self::assertStringContainsString('guest', $data['player2']);
        self::assertEquals([], $data['moves']);
        self::assertNull($data['winner']);
        self::assertFalse($data['draw']);
        self::assertEquals(1, $data['nextToMove']);
    }

    public function testGameWon(): void
    {
        $client = static::createClient();

        $client->request(method:'GET', uri: '/game/2');
        $response = $client->getResponse()->getContent();
        $data = json_decode($response, true);

        $this->assertResponseIsSuccessful();
        self::assertEquals(1, $data['winner']);
    }

    public function testThrowOnNonEmptySpot()
    {
        $client = static::createClient();

        $client->request(method:'PUT', uri: '/game/3', parameters: ['move' => '4']);
        $response = $client->getResponse();
        $content = $response->getContent();
        $data = json_decode($content, true);

        self::assertEquals(409, $response->getStatusCode());
        self::assertEquals([
            'error' => [
                'code' => 409,
                'message' => 'Move was made on a non empty spot'
            ]
        ], $data);
    }

    public function testThrowOnOutOfBound()
    {
        $client = static::createClient();

        $client->request(method:'PUT', uri: '/game/2', parameters: ['move' => '10']);
        $response = $client->getResponse();
        $content = $response->getContent();
        $data = json_decode($content, true);

        self::assertEquals(400, $response->getStatusCode());
        self::assertEquals([
            'error' => [
                'code' => 400,
                'message' => 'Move was made on a spot that is not part of the game field'
            ]
        ], $data);
    }

    public function testThrowOnWonGame()
    {
        $client = static::createClient();

        $client->request(method:'PUT', uri: '/game/2', parameters: ['move' => '0']);
        $response = $client->getResponse();
        $content = $response->getContent();
        $data = json_decode($content, true);

        self::assertEquals(403, $response->getStatusCode());
        self::assertEquals([
            'error' => [
                'code' => 403,
                'message' => 'Move was made in a game that is already declared won'
            ]
        ], $data);
    }
}
