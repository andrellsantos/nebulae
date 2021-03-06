const express = require('express')
const userAuth = require('../middleware/user-auth')
const adminAuth = require('../middleware/admin-auth')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/financial')

router.post('', adminAuth, controller.create)
router.get('', userAuth, controller.getAll)
router.get('/:quarter', userAuth, controller.getByQuarter)
router.patch('/:quarter', adminAuth, controller.update)

module.exports = router