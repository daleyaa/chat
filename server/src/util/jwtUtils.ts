import jwt from 'jsonwebtoken'
import DataStoredInToken from '../interfaces/dataStoredInToken'

export function generateToken(payload: object) {
  const secretKey = process.env.SECRET_KEY || '1234'
  const options = {
    expiresIn: '2 days',
  }

  const token = jwt.sign(payload, secretKey, options)
  return token
}

export function verifyUser(token: string) {
  const secretKey = process.env.SECRET_KEY || '1234'
  const verificationResponse = jwt.verify(token, secretKey) as DataStoredInToken
  return verificationResponse.id
}
