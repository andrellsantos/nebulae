const express = require('express')
const userAuth = require('../middleware/user-auth')
const adminAuth = require('../middleware/admin-auth')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/ticker')

router.post('', adminAuth, controller.create)
router.get('', userAuth, controller.getAll)
router.get('/:ticker', userAuth, controller.getByTicker)

module.exports = router