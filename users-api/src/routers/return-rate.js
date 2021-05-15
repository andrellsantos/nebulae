const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')
const controller = require('../controllers/return-rate')

router.get('', auth, controller.getAll)

module.exports = router