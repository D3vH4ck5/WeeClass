const express = require('express')
const router = express.Router()

const ctrl = require('./home.ctrl')

router.get('/weeclass', ctrl.output.index)
router.get('/weeclass/login', ctrl.output.login)
router.get('/weeclass/signup', ctrl.output.signup)
router.get('/weeclass/logout', ctrl.output.logout)
router.get('/weeclass/sangdam', ctrl.output.sangdam)
router.get('/weeclass/my_page', ctrl.output.my_page)
router.get('/weeclass/rules', ctrl.output.rules)
router.get('/weeclass/admin', ctrl.output.admin)
router.get('/weeclass/onlinesangdam', ctrl.output.onlinesangdam)


router.post('/weeclass/login', ctrl.process.login)
router.post('/weeclass/signup', ctrl.process.signup)
router.post('/weeclass/sangdam', ctrl.process.sangdam)

module.exports = router