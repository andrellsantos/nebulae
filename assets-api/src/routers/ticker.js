const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/ticker')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:ticker', controller.getByTicker)

module.exports = router