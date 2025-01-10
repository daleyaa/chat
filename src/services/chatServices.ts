import { AppDataSource } from '../data-source';
import { Chat } from '../entities/Chat';
import { User } from '../entities/User';
import { ChatType } from '../util/enums.ts/chatType';

const chatRepository = AppDataSource.getRepository(Chat);

export async function createChat(
  type: ChatType,
  user: User,
  username?: string,
) {
  const subscriptions = [];
  subscriptions.push(user);
  const chat = chatRepository.create({
    username,
    type,
    subscriptions,
    createBy: user,
  });
  return await chatRepository.save(chat);
}

export async function findChatById(id: number) {
  return await chatRepository.findOneBy({ id });
}

export async function removeChat(id: number) {
  return await chatRepository.delete(id);
}

export async function updateChat(
  chat: Chat,
  username?: string,
  createBy?: User,
) {
  if (username) {
    chat.username = username;
  }
  if (createBy) {
    chat.createBy = createBy;
  }
  return await chatRepository.save(chat);
}

export async function addUserToChat(chat: Chat, user: User) {
  chat.subscriptions.push(user);
  return await chatRepository.save(chat);
}

export async function removeUserFromChat(chat: Chat, user: User) {
  const subscribers = chat.subscriptions.filter(
    member => member.id !== user.id,
  );
  chat.subscriptions = subscribers;
  return await chatRepository.save(chat);
}

export async function removeAllSubscriberFromChat(chat: Chat) {
  chat.subscriptions = [];
  return await chatRepository.save(chat);
}

export async function getSubscriberChat(id: number) {
  const chat = await chatRepository.findOneBy({
    id,
  });
  if (chat) {
    return chat.subscriptions;
  }
  return [];
}
