const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  address: {
    type: String
  }
})

const Contract = mongoose.model('Contract', contractSchema)

module.exports = Contract
