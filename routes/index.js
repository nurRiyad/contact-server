import express from 'express'
import authRoutes from './auth.js'
import contractRoutes from './contract.js'
import userRoutes from './user.js'

const apiRoutes = express.Router()

apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/user', userRoutes)
apiRoutes.use('/contract', contractRoutes)

export default apiRoutes
