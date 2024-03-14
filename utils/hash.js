import { createHmac } from 'node:crypto'

export const hashAString = (str) => {
  const secret = process.env.HASH_SECRET
  const hashedPass = createHmac('sha256', secret).update(str).digest('hex')
  return hashedPass
}
