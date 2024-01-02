const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
