const express = require('express')
const auth = require('../middleware/auth')
const contractController = require('../controllers/contracts')

const route = express.Router()

// Get all the contract
route.get('/', auth, async (req, res, next) => await contractController.getAllContract(req, res, next))

// Add a new contract
route.post('/', auth, async (req, res, next) => await contractController.addANewContract(req, res, next))

// Get a specific contract
route.get('/:contractId', auth, async (req, res, next) => await contractController.getAContract(req, res, next))

// Update a contract
route.patch('/:contractId', auth, async (req, res, next) => await contractController.updateAContract(req, res, next))

// delete a contract
route.delete('/:contractId', auth, async (req, res, next) => await contractController.deleteAContract(req, res, next))

module.exports = route
