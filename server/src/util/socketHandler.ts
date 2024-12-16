import { Server } from 'socket.io'
import { createMessage } from '../services/messageServices'
import { findUserById } from '../services/userServices'

import { verifyUser } from './jwtUtils'
import { getSubscriberChat } from '../services/chatServices'

const socketUsers = new Map<string, string>()
export default function socketHandler() {
  const io = new Server({
    connectionStateRecovery: {},
    cors: {
      origin: '*',
    },
  })
  io.on('connection', socket => {
    console.log('user connected')
    let userId: string;
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
    socket.on('authenticate', (data) => {
      try{ 
      userId = String(verifyUser(data.jwt))
      socketUsers.set(socket.id, userId)
      console.log(`User(${userId}) authenticated.‍`)
      } catch(err) {
        console.log(err)
      }  
    })

    socket.on('chat message', async (response, callback) => {
      if(socketUsers.get(socket.id)) {
        const user = await findUserById(userId)
        if(user) {
          const subscribers = await getSubscriberChat(response.chatId)
          if(subscribers && subscribers.find(({id}) => id === user.id)) {
            try {
              await createMessage(response.msg, user, response.chatId)
            } catch (error) {
              if (error) {
                callback()
              }
              return
            }
            for (const subscriber of subscribers) {
              const socketId = findKeyInMap(socketUsers, String(subscriber.id))
              if(socketId) {
                io.to(socketId).emit(
                  'chat message',
                  `${user.username}: ${response.msg}`,
                )
              }    
            }
          }
        }
      }
    })   
  })
  io.listen(3001)
}

function findKeyInMap(map: Map<string, string>, searchValue: string){
  for(const [key, value] of map.entries()) {
    if(value === searchValue)
      return key
  }
  return undefined
}
