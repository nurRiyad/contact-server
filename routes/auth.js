const express = require('express')
const User = require('../model/user')
const { createHmac } = require('node:crypto')

const route = express.Router()

route.post('/signup', async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) next({ status: 400, message: 'Bad request' })
    else {
      const secret = process.env.HASH_SECRET
      const hashedPass = createHmac('sha256', secret).update(password).digest('hex')

      const user = new User({ email, username, password: hashedPass })
      const data = await user.save()
      res.send({ email: data.email, username: data.username })
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'User already exist' })
    else next(error)
  }
})

route.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) next({ status: 400, message: 'Bad request' })
    else {
      const secret = process.env.HASH_SECRET
      const hashedPass = createHmac('sha256', secret).update(password).digest('hex')

      const user = User.findOne({})
      const data = await user.findOne({ email, password: hashedPass }, { __v: 0, password: 0 })
      if (data) res.send(data)
      else next({ status: 401, message: 'Email or Password not matched' })
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'User already exist' })
    else next(error)
  }
})

route.get('/logout', async (req, res, next) => {
  res.send('Need to remove the json web token')
})

module.exports = route
