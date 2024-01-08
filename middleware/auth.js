const auth = (req, res, next) => {
  const user = {
    name: 'riyad',
    pass: '123'
  }

  req.user = user

  next()
}

module.exports = auth
