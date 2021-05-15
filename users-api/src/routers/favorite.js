const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')
const controller = require('../controllers/favorite')

router.post('', auth, controller.create)
router.get('', auth, controller.getAll)
router.delete('/:id', auth, controller.delete)

module.exports = router