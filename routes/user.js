const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/user')

const route = express.Router()

route.get('/', auth, async (req, res, next) => userController.getUser(req, res, next))

route.patch('/', auth, async (req, res, next) => userController.updateUser(req, res, next))

route.delete('/', auth, async (req, res, next) => userController.deleteUser(req, res, next))

module.exports = route
