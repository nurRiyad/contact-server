const Contract = require('../model/contract')
const joi = require('joi')

// Get all the contract
const getAllContract = async (req, res, next) => {
  try {
    const users = await Contract.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
}

// Add a new contract
const addANewContract = async (req, res, next) => {
  try {
    const schema = joi.object({
      number: joi.string().length(11).required(),
      name: joi.string().min(3).required(),
      address: joi.string()
    })

    const { number, name, address } = req.body || {}
    const { error } = schema.validate({ number, name, address })
    if (error) next({ status: 400, message: error.message || 'Bad Request' })
    else {
      const contract = new Contract({ number, name, address })
      const data = await contract.save()
      res.send(data)
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'Contract already exist' })
    else next(error)
  }
}

// Get a specific contract
const getAContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    const contract = await Contract.findOne({ number: contractId }, { number: 1, name: 1, _id: 0 })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
}

// Update a contract
const updateAContract = async (req, res, next) => {
  try {
    const schema = joi.object({
      name: joi.string().min(3),
      address: joi.string()
    })

    const { name, address } = req.body
    const { error } = schema.validate({ name, address })
    if (error) next({ status: 400, message: error.message || 'Bad request' })
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
}

// delete a contract
const deleteAContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    const contract = await Contract.findOneAndDelete({ number: contractId })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllContract, addANewContract, getAContract, updateAContract, deleteAContract }
