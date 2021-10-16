# Tic Tac Toe Backend

## Endpoint

```
POST /game/    # Create e new game, requires playe1 and player2 names in the request body 
GET /game/{id} # return data for game {id}
PUT /game/{id} # Do a move in game {id}, requires ad index 0-8
```

## Response

|name|type| desc|
|----|----|-----|
| id | int | id of the game
| player | string | player 1/2 name
| move | array | list of moves
| winner | int | [1 or 2 or null] whether the game is won by player 1 or 2 o none 
| draw | bool | is the game draw?
| nextToMove | int | next move is of...

## Test

Before run tests run this command:

```shell
composer test-init
```

and than

```shell
vendor/bin/phpunit
```

## Docker

everything is dockerized

```shell
docker-compose up -d --build
```

now go to `localhost:8080`

on now go to `localhost:8090` you can find adminer (visual editor for DB)
