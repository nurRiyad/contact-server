const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')

const route = express.Router()

route.get('/', auth, async (req, res, next) => {
  try {
    const { email } = req.params
    const user = await User.findOne({ email }, { number: 1, name: 1, _id: 0 })
    if (user) res.send(user)
    else next({ status: 404, message: 'No resource found' })
  } catch (error) {
    next(error)
  }
})

route.patch('/', auth, async (req, res, next) => {
  try {
    const { name, password, email } = req.body
    if (!name && !password) next({ status: 400, message: 'Bad request' })
    else {
      const user = await User.findOneAndUpdate({ email }, { name, password }, { returnDocument: 'after' })
      if (user) res.send(user)
      else next({ status: 404, message: 'User not found' })
    }
  } catch (error) {
    next(error)
  }
})

route.delete('/', auth, async (req, res, next) => {
  try {
    const { userId } = req.params
    const contract = await User.findOneAndDelete({ id: userId })
    if (contract) res.send(contract)
    else next({ status: 404, message: 'Contract not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = route
