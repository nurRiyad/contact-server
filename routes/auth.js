const express = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const hashAString = require('../utils/hash')
const authMiddleware = require('../middleware/auth')

const route = express.Router()

route.post('/signup', async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
      username: joi.string().min(3).alphanum().required()
    })

    const { email, username, password } = req.body
    const { error } = schema.validate({ email, username, password })

    if (error)
      next({
        status: 400,
        message: error.message || 'Band request'
      })
    else {
      const hashedPass = hashAString(password)

      const user = new User({ email, username, password: hashedPass })
      const data = await user.save()

      const payload = { email: data.email, username: data.username }
      const key = jwt.sign(payload, process.env.JWT_SECRET)
      res.cookie('accessToken', key, { httpOnly: true })
      res.json(payload)
    }
  } catch (error) {
    if (error.code === 11000) next({ status: 409, message: 'User already exist' })
    else next(error)
  }
})

route.post('/login', async (req, res, next) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4).required()
    })

    const { email, password } = req.body
    const { error } = schema.validate({ email, password })

    if (error)
      next({
        status: 400,
        message: error.message || 'Band request'
      })
    else {
      const hashedPass = hashAString(password)
      const user = await User.findOne({ email, password: hashedPass })

      if (user) {
        const payload = { email: user.email, username: user.username }
        const key = jwt.sign(payload, process.env.JWT_SECRET)
        res.cookie('accessToken', key, { httpOnly: true })
        res.json(payload)
      } else next({ status: 401, message: 'Email or Password not matched' })
    }
  } catch (error) {
    next(error)
  }
})

route.get('/logout', authMiddleware, async (req, res, next) => {
  res.clearCookie('accessToken')
  res.json({
    status: 200
  })
})

module.exports = route
