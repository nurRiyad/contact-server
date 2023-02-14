import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { contractRouter } from './routes/contractRouter.js'

dotenv.config()
const app = express()

app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/contract')
  . then(() => {
    console.log('Mongodb Connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.use('/api', contractRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server start listening at port ${process.env.SERVER_PORT}`)
})
