const express = require('express')
const contract = require('./contract')
const user = require('./user')
const auth = require('./auth')

const router = express.Router()

router.use('/contract', contract)
router.use('/user', user)
router.use('/auth', auth)

module.exports = router
