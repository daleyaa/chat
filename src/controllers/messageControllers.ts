import { Request, Response } from 'express';
import {
  findMessageById,
  getMessagesChat,
  removeMessage,
  updateMessage,
} from '../services/messageServices';

export async function changeMessageController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0 || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    if (req.body.context) {
      const message = await findMessageById(Number(req.params.id));
      if (!message) {
        return res.status(404).json({ message: 'Message Not Found' });
      }
      const newMessage = await updateMessage(message, req.body.context);
      return res.status(200).json({ newMessage });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
export async function deleteMessageController(req: Request, res: Response) {
  try {
    if (Number(req.params.id) < 0) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const result = await removeMessage(req.params.id);
    if (!result.affected) {
      return res.status(404).json({ message: 'Message Not Found' });
    }
    return res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
export async function getMessagesController(req: Request, res: Response) {
  try {
    if (
      Number(req.params.chatId) < 0 ||
      !req.query.offset ||
      !req.query.limit
    ) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const messages = await getMessagesChat(
      Number(req.params.id),
      Number(req.query.offset),
      Number(req.query.limit),
    );
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'Message Not Found' });
    }
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
