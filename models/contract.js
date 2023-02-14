import mongoose from 'mongoose'
const { Schema } = mongoose

const contractSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
})

export const Contract = mongoose.model('Contract', contractSchema)
