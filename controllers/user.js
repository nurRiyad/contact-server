const User = require('../model/user')
const joi = require('joi')

const getUser = async (req, res, next) => {
  try {
    const { email } = req.params
    const user = await User.findOne({ email }, { number: 1, name: 1, _id: 0 })
    if (user) res.send(user)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4),
      name: joi.string().min(3).alphanum()
    })

    const { name, password, email } = req.body
    const { error } = schema.validate({ email, password, name })
    if (error) next({ status: 400, message: error.message || 'Bad request' })
    else {
      const user = await User.findOneAndUpdate({ email }, { name, password }, { returnDocument: 'after' })
      if (user) res.send(user)
      else next({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const contract = await User.findOneAndDelete({ id: userId })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getUser, updateUser, deleteUser }
