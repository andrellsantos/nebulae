const express = require('express')
const router = express.Router({ mergeParams: true })

const controller = require('../controllers/user')

router.post('', controller.create)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/logoutAll', controller.logoutAll)
router.get('/me', controller.get)
router.patch('/me', controller.update)

module.exports = router