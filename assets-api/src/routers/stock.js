const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/stock')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:symbol', controller.getBySymbol)
router.patch('/:symbol', controller.update)

module.exports = router