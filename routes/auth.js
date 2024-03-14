import express from 'express'
import { handleLogin, handleLogout, handleSignup } from '../controllers/auth.js'
import auth from '../middleware/auth.js'

const authRoutes = express.Router()

authRoutes.post('/signup', async (req, res, next) => await handleSignup(req, res, next))

authRoutes.post('/login', async (req, res, next) => await handleLogin(req, res, next))

authRoutes.get('/logout', auth, async (req, res, next) => await handleLogout(req, res, next))

export default authRoutes
