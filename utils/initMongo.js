import mongoose from 'mongoose'

export const initMongoDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
    console.log('Connected To Mongodb')
  } catch (error) {
    console.error('Cannot Connect to mongodb')
  }
}
