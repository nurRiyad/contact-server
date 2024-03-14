import express from 'express'
import { deleteUser, getUser, updateUser } from '../controllers/user.js'
import auth from '../middleware/auth.js'

const userRoutes = express.Router()

userRoutes.get('/', auth, async (req, res, next) => getUser(req, res, next))

userRoutes.patch('/', auth, async (req, res, next) => updateUser(req, res, next))

userRoutes.delete('/', auth, async (req, res, next) => deleteUser(req, res, next))

export default userRoutes
