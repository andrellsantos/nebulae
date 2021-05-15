const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')
const controller = require('../controllers/portfolio')

router.get('', auth, controller.getAll)
router.patch('/:id', auth, controller.update)

module.exports = router