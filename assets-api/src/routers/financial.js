const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/financial')

router.post('', controller.create)
router.get('', controller.getAll)
router.get('/:quarter', controller.getByQuarter)
router.patch('/:quarter', controller.update)

module.exports = router