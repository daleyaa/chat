import { NextFunction, Request, Response } from 'express'
import { verifyUser } from '../util/jwtUtils'
import { AppDataSource } from '../data-source'
import { Chat } from '../entities/Chat'
export default async function checkChatAccessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    const loginUserId = verifyUser(token)
    if (req.params.id) {
      const chatRepository = AppDataSource.getRepository(Chat)
      const chat = await chatRepository.findOneBy({
        id: Number(req.params.id),
      })
      const findResult = chat?.subscriptions.find(
        user => user.id === loginUserId,
      )
      if (findResult) {
        return next()
      }
      return res.status(403).json({ message: 'Forbidden' })
    } else {
      if (
        loginUserId === req.body.createById ||
        loginUserId === req.body.userId
      ) {
        return next()
      }
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
