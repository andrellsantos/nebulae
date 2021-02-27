const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/quote')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:date', controller.getByDate)
router.patch('/:date', controller.update)

module.exports = router