const express = require('express');
const router = express.Router();

const game = require('../controllers/game')

router.get('/:id', game.status);
router.post('/', game.create);
router.put('/:id', game.move);

module.exports = router;
