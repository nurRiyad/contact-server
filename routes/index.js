const express = require('express')
const contract = require('./contract')

const router = express.Router()

router.use('/contract', contract)

module.exports = router
