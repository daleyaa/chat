import { Server } from 'socket.io'
import { createMessage } from '../services/messageServices'
import { findUserById } from '../services/userServices'
import { Server as ServerHttp } from 'http'

export default function socketHandler(serverHttp: ServerHttp) {
  const server = serverHttp
  const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: '*',
    },
  })
  io.on('connection', socket => {
    console.log('user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    socket.on('chat message', async (response, callback) => {
      try {
        await createMessage(response.msg, response.senderId, response.chatId)
      } catch (error) {
        if (error) {
          callback()
        }
        return
      }
      const user = await findUserById(response.senderId)
      if (user) {
        io.emit('chat message', `${user.username}: ${response.msg}`)
      }
      // const subscribers = await getSubscriberChat(response.chatId)
      // if (user && subscribers) {
      //   for (const subscriber of subscribers) {
      //     io.to(String(subscriber.id)).emit(
      //       'chat message',
      //       `${user.username}: ${response.msg}`,
      //     )
      //   }
      // }
    })
  })
}
