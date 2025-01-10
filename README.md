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

- NPM
- Node.js
- Postgresql database
- Redis

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/daleyaa/chat.git
   ```
2. Install NPM packages
   ```bash
   npm install
   ```
3. Create `.env` file based on the `.env.example`file

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
   ![config Connection](/public/assets/config-connection.png 'config Connection')
8. Emit `authenticate` event
   ![authenticate](/public/assets/authenticate.png 'authenticate')
9. Emit `chat message`event to send a message to a specific chat
   ![chat message](/public/assets/chat-message.png 'chat message')

## Running with Docker Compose

### Configuration

1. Make sure that the `.env` file is created based on the `.env.example` file.
2. Use `redis` for REDIS_HOST and `db` for `POSTGRES_HOST`.

### Running

You can run this command to start the project using docker compose:

```bash
docker compose up --build -d
```
