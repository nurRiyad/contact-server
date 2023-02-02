import express from 'express'
import { createContract, deleteAContract, getAContract, getAllContract, updateAContract } from '../controller/contractController.js'

export const contractRouter = express.Router()

contractRouter.get('/contracts', getAllContract)

contractRouter.post('/contracts', createContract)

contractRouter.get('/contracts/:id', getAContract)

contractRouter.put('/contracts/:id', updateAContract)

contractRouter.delete('/contracts/:id', deleteAContract)
