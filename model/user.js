const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
