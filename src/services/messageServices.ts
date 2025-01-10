import { AppDataSource } from '../data-source';
import { Chat } from '../entities/Chat';
import { Message } from '../entities/Message';
import { User } from '../entities/User';

const messageRepository = AppDataSource.getRepository(Message);

export async function findMessageById(id: number) {
  const message = await messageRepository.findOneBy({
    id,
  });
  return message;
}
export async function createMessage(context: string, sender: User, chat: Chat) {
  const message = messageRepository.create({
    context,
    sender,
    chat,
  });
  return await messageRepository.save(message);
}
export async function updateMessage(message: Message, context: string) {
  message.context = context;
  return await messageRepository.save(message);
}

export async function removeMessage(id: string) {
  return await messageRepository.delete(id);
}
export async function getMessagesChat(
  chatId: number,
  offset: number,
  limit: number,
) {
  const messages = await messageRepository.find({
    where: {
      chat: {
        id: chatId,
      },
    },
    take: limit,
    skip: offset,
    order: {
      id: 'ASC',
    },
  });
  return messages;
}
