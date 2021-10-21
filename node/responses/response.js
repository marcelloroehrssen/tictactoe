const errors = require("../errors/index")

class Game {

    #combos = [
        ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], // horizontal
        ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], // vertical
        ['0', '4', '8'], ['2', '4', '6'],         // obliques
    ];

    id
    player1
    player2
    moves = {}
    winner = null
    draw = false
    nextToMove = 2

    constructor(row) {
        const moves = JSON.parse(row.moves);

        this.id = row.id
        this.player1 = row.player1
        this.player2 =  row.player2
        this.moves = moves
        this.getWinner()
        this.isDraw()
        this.getNextToMove()
    }

    move(index) {
        if (index < 0 || index > 8)
            throw new errors.MoveOnOutOfBoundSpot();
        if (this.moves[index])
            throw new errors.MoveNonEmptySpot();
        if (this.draw)
            throw new errors.MoveOnDrawGame()
        if (this.winner)
            throw new errors.MoveOnWonGame()

        this.moves = {...this.moves, [index]: this.nextToMove}
        this.getWinner()
        this.isDraw()
        this.getNextToMove()
    }

    getWinner() {
        const winnigCombo = this.#combos.map((combo) => {
            const [a,b,c] = combo
            if (!this.moves[a] || !this.moves[b] || !this.moves[c]) {
                return null
            }
            if (this.moves[a] === this.moves[b] && this.moves[a] === this.moves[c]) {
                return this.moves[a];
            }
            return null
        })
        const winner = Math.max(...winnigCombo)
        this.winner = winner === 0 ? null : winner;
    }

    isDraw() {
        this.draw = Object.keys(this.moves).length === 9
    }

    getNextToMove() {
        this.nextToMove = Object.keys(this.moves).length % 2 === 0 ? 1 : 2
    }
}

module.exports = Game
