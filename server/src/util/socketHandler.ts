import { Server } from 'socket.io';
import { createMessage } from '../services/messageServices';
import { findUserById } from '../services/userServices';

import { verifyUser } from './jwtUtils';
import { getSubscriberChat } from '../services/chatServices';

import Redis from 'ioredis';
const redis = new Redis();

export default function socketHandler() {
  const io = new Server({
    connectionStateRecovery: {},
    cors: {
      origin: '*',
    },
  });
  io.on('connection', socket => {
    console.log('user connected');
    let userId: string;
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('authenticate', data => {
      try {
        userId = String(verifyUser(data.jwt));
        redis.set(`socket: ${socket.id}`, userId);
        redis.set(`user: ${userId}`, socket.id);

        console.log(`User(${userId}) authenticated.`);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('chat message', async (response, callback) => {
      redis
        .get(`socket: ${socket.id}`)
        .then(async result => {
          if (result !== null) {
            const user = await findUserById(result);
            if (user) {
              const subscribers = await getSubscriberChat(response.chatId);
              if (subscribers && subscribers.find(({ id }) => id === user.id)) {
                try {
                  await createMessage(response.msg, user, response.chatId);
                } catch (error) {
                  if (error) {
                    callback();
                  }
                  return;
                }
                for (const subscriber of subscribers) {
                  redis.get(`user: ${subscriber.id}`).then(async result => {
                    if (result !== null) {
                      io.to(result).emit(
                        'chat message',
                        `${user.username}: ${response.msg}`,
                      );
                    }
                  });
                }
              }
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    });
  });
  io.listen(3001);
}
