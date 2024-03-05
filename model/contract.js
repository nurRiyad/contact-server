const mongoose = require('mongoose')

const contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  number: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    maxLength: 20
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

contractSchema.index({ name: 1, userId: 1 }, { unique: true })

const Contract = mongoose.model('Contract', contractSchema)

module.exports = Contract

// schemas are like class
// models are like object
// So mongoose.Schema() helps us to create new class
// mongoose.model help use to create new object
// and you can use this object to create, update, delete and query values
