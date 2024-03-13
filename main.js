const express = require('express')
const apiRoutes = require('./routes')
const initMongoDb = require('./utils/initMongo')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

// for reading .env file
require('dotenv').config()

// init express server
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))

// connect mongodb
initMongoDb()

// all available routes
app.use('/api/v1', apiRoutes)

// Catch all route
app.use((req, res, next) => {
  next({ status: 404, message: 'Resource Not Found' })
})

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500

  // don't show internal server error msg in prod server
  const devErrMsg = err.message || 'Internal Server Error'
  const prodErrMsg = statusCode === 500 ? 'Internal Server Error' : err.message ? err.message : 'Internal Server Error'

  res.status(statusCode)
  res.send({
    status: statusCode,
    message: process.env.NODE_ENV === 'development' ? devErrMsg : prodErrMsg
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server start listening on port ${process.env.PORT}`)
})
