const express = require('express')
const userAuth = require('../middleware/user-auth')
const adminAuth = require('../middleware/admin-auth')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/stock')

router.post('', adminAuth, controller.create)
router.get('', userAuth, controller.getAll)
router.get('/:symbol', userAuth, controller.getBySymbol)
router.patch('/:symbol', adminAuth, controller.update)

module.exports = router