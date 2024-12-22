import loginRoutes from './routes/loginRoutes';
import signupRoutes from './routes/signupRoutes';
import userRoutes from './routes/userRoutes';

import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import messageRoutes from './routes/messageRoutes';
import chatRoutes from './routes/chatRoutes';
import { createServer } from 'http';
import socketHandler from './util/socketHandler';
import { join } from 'node:path';

dotenv.config();
const app = express();
const port = process.env.PORT_APP;
const server = createServer(app);

if (
  !process.env.DB_DATABASE ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST
) {
  console.error('Database config is not valid!');
  process.exit(1);
}

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Login Express API with Swagger',
      version: '0.1.0',
      description:
        'This is a Login API made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      Bearer: [],
    },
    Bearer: [],
  },
  apis: ['./src/routes/*.ts'],
};

//TODO
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'util/index.html'));
});

const specs = swaggerJsdoc(options);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    app.use('/login', loginRoutes);
    app.use('/signup', signupRoutes);
    app.use('/users', userRoutes);
    app.use('/messages', messageRoutes);
    app.use('/chats', chatRoutes);
    socketHandler();
    server.listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
