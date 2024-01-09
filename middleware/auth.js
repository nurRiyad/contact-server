const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies
    if (!accessToken) next({ status: 401, message: 'Unauthorize' })

    const val = await jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = { ...val, isLoggedIn: true }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) next({ status: 401, message: 'Unauthorize' })
    else next(error)
  }
}

module.exports = auth
