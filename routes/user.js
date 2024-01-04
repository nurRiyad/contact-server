const express = require('express')

const route = express.Router()

route.get('/', (req, res) => {
  res.send('Send a user data')
})

route.patch('/', (req, res) => {
  res.send('Update a user data')
})

route.delete('/', (req, res) => {
  res.send('Delete A user')
})

module.exports = route
