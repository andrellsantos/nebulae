const express = require('express');
const router = express.Router();

const controller = require('../controllers/stock');

router.post('', controller.create);
router.get('', controller.getAll);
router.get('/:ticker', controller.getByTicker);
router.patch('/:ticker', controller.update);

module.exports = router;