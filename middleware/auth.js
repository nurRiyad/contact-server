import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies
    if (!accessToken) return next({ status: 401, message: 'Unauthorize' })

    const val = await jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = { ...val, isLoggedIn: true }

    return next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) return next({ status: 401, message: 'Unauthorize' })
    else return next(error)
  }
}

export default auth
