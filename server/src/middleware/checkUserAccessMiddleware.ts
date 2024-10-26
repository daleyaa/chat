import { NextFunction, Request, Response } from 'express'
import { verifyUser } from '../util/jwtUtils'
export default async function checkUserAccessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    const loginUserId = verifyUser(token)
    if (Number(req.params.id) === loginUserId) {
      return next()
    }
    return res.status(403).json({ message: 'Forbidden' })
  }
}
