import { NextFunction, Request, Response } from 'express'
import { verifyUser } from '../util/jwtUtils'
import { AppDataSource } from '../data-source'
import { Chat } from '../entities/Chat'
import { Message } from '../entities/Message'
export default async function checkMessageAccessMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (token) {
    const loginUserId = verifyUser(token)
    if (req.params.id) {
      const messageRepository = AppDataSource.getRepository(Message)
      const message = await messageRepository.findOneBy({
        id: Number(req.params.id),
        sender: {
          id: loginUserId,
        },
      })
      if (message) {
        return next()
      }
      return res.status(403).json({ message: 'Forbidden' })
    } else {
      const chatRepository = AppDataSource.getRepository(Chat)
      const chat = await chatRepository.findOneBy({
        id: req.body.chatId,
      })
      const findResult = chat?.subscriptions.find(
        user => user.id === loginUserId,
      )
      if (loginUserId === req.body.senderId && findResult) {
        return next()
      }
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
