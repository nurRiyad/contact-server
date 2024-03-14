import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    require: true,
    minLength: 4
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', userSchema)

export default User

// schemas are like class
// models are like object
// So mongoose.Schema() helps us to create new class
// mongoose.model help use to create new object
// and you can use this object to create, update, delete and query values
