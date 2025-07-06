const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');

router.post('/roll', gameController.roll);
router.post('/start', gameController.start);
router.post('/cashout', gameController.cashout);

module.exports = router;