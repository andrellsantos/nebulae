const express = require('express')
const userAuth = require('../middleware/user-auth')
const adminAuth = require('../middleware/admin-auth')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/quote')

router.post('', adminAuth, controller.create)
router.get('', userAuth, controller.getAll)
router.get('/:date', userAuth, controller.getByDate)
router.patch('/:date', adminAuth, controller.update)

module.exports = router