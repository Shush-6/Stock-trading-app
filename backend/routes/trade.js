const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');
const auth = require('../middleware/auth');

router.post('/buy', auth, tradeController.buyStock);
router.post('/sell', auth, tradeController.sellStock);
router.get('/portfolio', auth, tradeController.getPortfolio);

module.exports = router;
