const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/ticker')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:ticker', controller.getByTicker)
router.patch('/:ticker', controller.update)

module.exports = router