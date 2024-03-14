import joi from 'joi'
import Contract from '../model/contract.js'

// Get all the contract
export const getAllContract = async (req, res, next) => {
  try {
    const userId = req.user.uid
    const users = await Contract.find({ userId }, { __v: 0, userId: 0 })
    res.send(users)
  } catch (error) {
    next(error)
  }
}

// Add a new contract
export const addANewContract = async (req, res, next) => {
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
      const userId = req.user.uid
      const contract = new Contract({ name, userId, number, address })
      const data = await contract.save()
      const formattedData = { name: data.name, number: data.number, address: data.address, createdAt: data.createdAt }
      res.send(formattedData)
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'Contract already exist' })
    else next(error)
  }
}

// Get a specific contract
export const getAContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    const userId = req.user.uid

    const contract = await Contract.findOne({ userId, name: contractId }, { __v: 0, userId: 0 })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
}

// Update a contract
export const updateAContract = async (req, res, next) => {
  try {
    const schema = joi.object({
      number: joi.string().length(11).required(),
      address: joi.string()
    })

    const { number, address } = req.body
    const { error } = schema.validate({ number, address })
    if (error) next({ status: 400, message: error.message || 'Bad request' })
    else {
      const { contractId } = req.params
      const userId = req.user.uid
      const contract = await Contract.findOneAndUpdate(
        { userId, name: contractId },
        { number, address },
        { returnDocument: 'after', projection: { __v: 0, userId: 0 } }
      )
      if (contract) res.send(contract)
      else next({ status: 404, message: 'ContractId not found' })
    }
  } catch (error) {
    next(error)
  }
}

// delete a contract
export const deleteAContract = async (req, res, next) => {
  try {
    const { contractId } = req.params
    const userId = req.user.uid

    const contract = await Contract.findOneAndDelete(
      { userId, name: contractId },
      { projection: { __v: 0, userId: 0 } }
    )
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
}
