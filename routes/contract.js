const express = require('express')
const Contract = require('../model/contract')

const route = express.Router()

// Get all the contract
route.get('/', async (req, res, next) => {
  try {
    const users = await Contract.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

// Add a new contract
route.post('/', async (req, res, next) => {
  try {
    const { number, name, address } = req.body || {}
    if (!number || !name) next({ status: 422, message: 'Bad Request' })
    else {
      const contract = new Contract({ number, name, address })
      const data = await contract.save()
      res.send(data)
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'Contract already exist' })
    else next(error)
  }
})

// Get a specific contract
route.get('/:contractId', async (req, res, next) => {
  try {
    const { contractId } = req.params
    const contract = await Contract.findOne({ number: contractId }, { number: 1, name: 1, _id: 0 })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
})

// Update a contract
route.patch('/:contractId', async (req, res, next) => {
  try {
    const { name, address } = req.body
    if (!name && !address) next({ status: 400, message: 'Bad request' })
    else {
      const { contractId } = req.params
      const contract = await Contract.findOneAndUpdate(
        { number: contractId },
        { name, address },
        { returnDocument: 'after' }
      )
      if (contract) res.send(contract)
      else next({ status: 404, message: 'ContractId not found' })
    }
  } catch (error) {
    next(error)
  }
})

// delete a contract
route.delete('/:contractId', async (req, res, next) => {
  try {
    const { contractId } = req.params
    const contract = await Contract.findOneAndDelete({ number: contractId })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = route
