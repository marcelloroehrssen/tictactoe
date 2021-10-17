class BaseError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = code;
    }
}

class MoveOnOutOfBoundSpot extends BaseError {

    constructor() {
        super("Move was made on a spot that is not part of the game field", 400);
    }
}

class MoveNonEmptySpot extends BaseError {

    constructor() {
        super("Move was made on a non empty spot", 409);
    }
}

class MoveOnDrawGame extends BaseError {

    constructor() {
        super('Move was made in a game that is already declared draw', 403);
    }
}

class MoveOnWonGame extends BaseError {

    constructor() {
        super("Move was made in a game that is already declared won", 403);
    }
}

module.exports = {
    MoveOnOutOfBoundSpot, MoveNonEmptySpot, MoveOnDrawGame, MoveOnWonGame
}