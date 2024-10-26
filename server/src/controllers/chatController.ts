import { Request, Response } from 'express'
import { ChatType } from '../util/enums.ts/chatType'
import { findUserById } from '../services/userServices'
import {
  createChat,
  findChatById,
  removeChat,
  addUserToChat,
  updateChat,
  removeUserFromChat,
  removeAllSubscriberFromChat,
} from '../services/chatServices'

export async function createChatController(req: Request, res: Response) {
  try {
    if (
      !req.body.createById ||
      !req.body.type ||
      (req.body.type !== ChatType.pv && !req.body.username)
    ) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const user = await findUserById(req.body.createById)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    const chat = await createChat(req.body.type, user, req.body.username)
    return res.status(201).json(chat)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function getChatByIdController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const chat = await findChatById(Number(req.params.id))
    if (!chat) {
      return res.status(404).json({ message: 'Chat Not Found' })
    }
    return res.status(201).json(chat)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function deleteChatController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const chat = await findChatById(Number(req.params.id))
    if (!chat) {
      return res.status(404).json({ message: 'Chat Not Found' })
    }
    await removeAllSubscriberFromChat(chat)
    const result = await removeChat(Number(req.params.id))
    if (!result.affected) {
      return res.status(404).json({ message: 'Chat Not Found' })
    }
    return res.status(200).json({ message: 'Chat Deleted' })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function changeChatController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0 || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    if (req.body.createBy || req.body.username) {
      const chat = await findChatById(Number(req.params.id))
      if (!chat) {
        return res.status(404).json({ message: 'Chat Not Found' })
      }
      if (req.body.createBy) {
        const user = await findUserById(req.body.createBy)
        if (user) {
          const isSubscribe = chat.subscriptions.find(
            member => member.id === user.id,
          )
          if (isSubscribe) {
            const newChat = await updateChat(
              chat,
              req.body.username,
              req.body.createBy,
            )
            return res.status(200).json(newChat)
          } else {
            return res.status(400).json({
              message: "This user isn't a subscriber",
            })
          }
        } else {
          return res.status(404).json({
            message: 'User Not Found',
          })
        }
      } else {
        const newChat = await updateChat(chat, req.body.username)
        return res.status(200).json(newChat)
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error })
  }
}

export async function subscribeUserToChatController(
  req: Request,
  res: Response,
) {
  try {
    if (!req.body.userId || !req.body.chatId) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const user = await findUserById(req.body.userId)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }
    const chat = await findChatById(req.body.chatId)
    if (!chat) {
      return res.status(404).json({ message: 'Chat Not Found' })
    }
    const conflictUser = chat.subscriptions.find(
      member => member.id === req.body.userId,
    )
    if (conflictUser) {
      return res.status(409).json({
        message: 'The user is already a member',
      })
    }
    const newChat = await addUserToChat(chat, user)
    return res.status(201).json(newChat)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function unsubscribeUserToChatController(
  req: Request,
  res: Response,
) {
  try {
    if (!req.body.userId || !req.body.chatId) {
      return res.status(400).json({ message: 'Bad Request' })
    }
    const chat = await findChatById(req.body.chatId)
    if (!chat) {
      return res.status(404).json({ message: 'Chat Not Found' })
    }

    const user = await findUserById(req.body.userId)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    if (!chat.subscriptions.find(user => user.id === req.body.userId)) {
      return res
        .status(404)
        .json({ message: 'This user has not joined before' })
    }
    if (chat.type !== ChatType.pv && chat.createBy.id === user.id) {
      return res.status(400).json({
        message: 'The creator of the chat can not leave the chat',
      })
    }
    const newChat = await removeUserFromChat(chat, user)
    return res.status(201).json(newChat)
  } catch (error) {
    return res.status(500).json(error)
  }
}
