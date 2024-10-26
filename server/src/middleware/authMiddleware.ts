import { NextFunction, Request, Response } from 'express'
export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' })
  } else {
    next()
  }
}
