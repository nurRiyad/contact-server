const express = require('express')
const contract = require('./contract')
const user = require('./user')
const auth = require('./auth')

const router = express.Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/contract', contract)

module.exports = router
