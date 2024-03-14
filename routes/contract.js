import express from 'express'
import {
  addANewContract,
  deleteAContract,
  getAContract,
  getAllContract,
  updateAContract
} from '../controllers/contracts.js'
import auth from '../middleware/auth.js'

const contractRoutes = express.Router()

// Get all the contract
contractRoutes.get('/', auth, async (req, res, next) => await getAllContract(req, res, next))

// Add a new contract
contractRoutes.post('/', auth, async (req, res, next) => await addANewContract(req, res, next))

// Get a specific contract
contractRoutes.get('/:contractId', auth, async (req, res, next) => await getAContract(req, res, next))

// Update a contract
contractRoutes.patch('/:contractId', auth, async (req, res, next) => await updateAContract(req, res, next))

// delete a contract
contractRoutes.delete('/:contractId', auth, async (req, res, next) => await deleteAContract(req, res, next))

export default contractRoutes
