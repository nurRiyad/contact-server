const express = require('express')
const authMiddleware = require('../middleware/auth')
const { handleSignup, handleLogin, handleLogout } = require('../controllers/auth')

const route = express.Router()

route.post('/signup', async (req, res, next) => await handleSignup(req, res, next))

route.post('/login', async (req, res, next) => await handleLogin(req, res, next))

route.get('/logout', authMiddleware, async (req, res, next) => await handleLogout(req, res, next))

module.exports = route
