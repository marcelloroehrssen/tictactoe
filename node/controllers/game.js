const db = require("../configs/db")
const Game = require('../responses/response')

const randomInt = (min, max) => Math.random() * (max - min) + min;

const fetch = (id, callable) => {
    db.query("select * from game where id = ?", [id], (err, row) => {
        if (err) throw err;
        const g = new Game(row[0]);
        callable(g)
    })
}

exports.create = (req, res) => {
    db.query("insert into game set ?",
        {
            player1: req.player1 ?? 'guest' + Math.floor(randomInt(0, 1000)),
            player2: req.player2 ?? 'guest' + Math.floor(randomInt(0, 1000)),
            moves: "[]"
        },
        (err, row) => {
            if (err) throw err;
            fetch(row.insertId, (g) => res.json(g))
    })
}

exports.status = (req, res) => {
    fetch(req.params.id, (g) => res.json(g))
}

exports.move = (req, res) => {
    fetch(req.params.id, (g) => {
        g.move(req.body.move)
        db.query("update game set moves = ? where id = ?", [JSON.stringify(g.moves), req.params.id], (err, row) => {
            if (err) throw err;
            return res.json(g)
        })
    })
}