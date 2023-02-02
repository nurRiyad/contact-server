import express from 'express'
import * as dotenv from 'dotenv'
import { contractRouter } from './routes/contractRouter.js'

dotenv.config()
const app = express()

app.use(express.json())

app.use('/api', contractRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server start listening at port ${process.env.SERVER_PORT}`)
})
