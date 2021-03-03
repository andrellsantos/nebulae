const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth')
const controller = require('../controllers/user')

router.post('', controller.create)
router.post('/login', controller.login)
router.post('/logout', auth, controller.logout)
router.post('/logoutAll', auth, controller.logoutAll)
router.get('/me', auth, controller.get)
router.patch('/me', auth, controller.update)
router.delete('/me', auth, controller.delete)

module.exports = router