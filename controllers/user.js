import joi from 'joi'
import User from '../model/user.js'
import { hashAString } from '../utils/hash.js'

export const getUser = async (req, res, next) => {
  try {
    const { email } = req.user
    const user = await User.findOne({ email }, { password: 0, __v: 0 })
    if (user) res.send(user)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const schema = joi.object({
      username: joi.string().min(3).alphanum(),
      password: joi.string().min(4)
    })

    const { username, password } = req.body
    const { error } = schema.validate({ username, password })
    if (error) next({ status: 400, message: error.message || 'Bad request' })
    else {
      const { email: loginUserEmail } = req.user
      const user = await User.findOneAndUpdate(
        { email: loginUserEmail },
        { username, password: hashAString(password) },
        { returnDocument: 'after', projection: { __v: 0, password: 0 } }
      )
      if (user) res.send(user)
      else next({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const contract = await User.findOneAndDelete({ id: userId }, { projection: { __v: 0, password: 0 } })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
}
