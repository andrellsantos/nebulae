const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')
const controller = require('../controllers/transaction')

router.post('', auth, controller.create)
router.get('', auth, controller.getAll)
router.get('/:id', auth, controller.getById)
router.patch('/:id', auth, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router