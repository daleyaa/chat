# **Onlion chat**
## About The Project
The purpose of creating the project was to work with sockets.
Items used in the project:
- Node.js: A cross-platform for javascript runtime environment
- Typescript: Language used in the project
- Express: Used to build RESTful API
- Typeorm: The ORM used
- Swagger:Used to document the project API
- Prettier: To unify file formats
- Eslint: To find and fix problems before project implementation
- Postgresql: As a database
- Socket.io: To implement the real-time part
- Redis: To store online users and their socketId to send messages with socket


## Getting Startrd
### Prerequisites
#### Sever
- NPM
- Node.js
- Postgresql database
### Installation
- Clone the repository 
    ```bash 
    git clone https://github.com/daleyaa/chat.git 
    ```
#### Server
1. Install NPM packages
    ```bash 
    npm install 
    ```
2. Create `.env` file based on the `.env.example`file

3. Run project
    ```bash
    npm run
    ```
## Usage
1. Open the project in your favorite code editor.
2. Build the project
    ```bash 
    npm run build
    ```
3. Run project
    ```bash
    npm start
    ```
4. You can see API in `http://localhost:3000/api-docs`
5. Create User and chat
6. You can chat online using `http://amritb.github.io/socketio-client-tool/`
7. Change configure connection 
![config Connection](/server/public/assets/config-connection.png "config Connection")
8. Emit `authenticate` event
![authenticate](/server/public/assets/authenticate.png "authenticate")
9. Emit `chat message`event to send a message to a specific chat 
![chat message](/server/public/assets/chat-message.png "chat message")