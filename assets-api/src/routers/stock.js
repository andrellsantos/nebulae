const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/stock')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:exchangeComissionCode', controller.getByExchangeComissionCode)
router.patch('/:exchangeComissionCode', controller.update)

module.exports = router