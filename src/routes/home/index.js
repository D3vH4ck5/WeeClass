const express = require('express')
const router = express.Router()

const ctrl = require('./home.ctrl')

router.get('/', ctrl.output.index)
router.get('/login', ctrl.output.login)
router.get('/signup', ctrl.output.signup)
router.get('/logout', ctrl.output.logout)

router.post('/login', ctrl.process.login)
router.post('/signup', ctrl.process.signup)

module.exports = router