import { Router, Request, Response } from 'express';
import {
  changeChatController,
  createChatController,
  deleteChatController,
  getChatByIdController,
  subscribeUserToChatController,
  unsubscribeUserToChatController,
} from '../controllers/chatController';
import authMiddleware from '../middleware/authMiddleware';
import checkChatAccessMiddleware from '../middleware/checkChatAccessMiddleware';

/**
 * @swagger
 * components:
 *  schemas:
 *    Chat:
 *      type: object
 *      required:
 *        - type
 *        - createById
 *      properties:
 *        id:
 *          type: number
 *          format: int64
 *          description: chatId
 *        username:
 *          type: string
 *          description: The name of group or bot
 *        type:
 *          type: string
 *          enum: [pv, group, bot]
 *          description: The type of chat
 *        createAt:
 *          type: string
 *          format: date-time
 *          description: The date of chat created
 *        updateAt:
 *          type: string
 *          format: date-time
 *          description: The date of chat updated
 *        subscriptions:
 *          type: object
 *          description: The users joined this chat
 *        messages:
 *          type: object
 *          description: The messages in this chat
 *        createById:
 *          type: number
 *          description: The user create chat
 *      example:
 *        id: 1
 *        username: "new-group"
 *        type: "group"
 *        createAt: "2024-08-27 15:38:46.551434"
 *        updateAt: "2024-08-27 15:38:46.551434"
 *        subscriptions: {}
 *        messages: {}
 *        createById: 1
 */

/**
 * @swagger
 * tags:
 *  name: Chats
 *  description: The chat managing API
 * /chats:
 *  post:
 *    summary: Create a new chat
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Chat'
 *    responses:
 *      201:
 *        description: Chat created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 * /chats/{id}:
 *  get:
 *    summary: Get a Chat by id
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The chat id
 *    responses:
 *      200:
 *        description: Information about this chat
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 *  delete:
 *    summary: Delete chat by id
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The chat id
 *    responses:
 *      200:
 *        description: Deleted chat
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *              example:
 *                 message: "Chat deleted"
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 *  put:
 *    summary: Update chat data by id
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The chat id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              createBy:
 *                type: number
 *                description: The user id created this chat
 *              username:
 *                type: string
 *                description: The chat username
 *            example:
 *               username: "new-group"
 *               createBy: 1
 *    responses:
 *      200:
 *        description: Update chat data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      409:
 *        $ref: '#/components/responses/409'
 *      500:
 *        $ref: '#/components/responses/500'
 * /chats/subscribe:
 *  post:
 *    summary: Subscribe user in this chat
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: number
 *                description: The user id
 *              chatId:
 *                type: number
 *                description: The chat id
 *            example:
 *               chatId: 1
 *               userId: 1
 *    responses:
 *      201:
 *        description: User subscribed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      409:
 *        $ref: '#/components/responses/409'
 *      500:
 *        $ref: '#/components/responses/500'
 * /chats/unsubscribe:
 *  post:
 *    summary: Unsubscribe user in this chat
 *    tags: [Chats]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: number
 *                description: The user id
 *              chatId:
 *                type: number
 *                description: The chat id
 *            example:
 *               chatId: 1
 *               userId: 1
 *    responses:
 *      201:
 *        description: User unsubscribed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Chat'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref: '#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 */
const router = Router();
router.post(
  '/',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await createChatController(req, res);
  },
);
router.put(
  '/:id',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await changeChatController(req, res);
  },
);
router.delete(
  '/:id',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await deleteChatController(req, res);
  },
);
router.get(
  '/:id',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await getChatByIdController(req, res);
  },
);
router.post(
  '/subscribe',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await subscribeUserToChatController(req, res);
  },
);
router.post(
  '/unsubscribe',
  [authMiddleware, checkChatAccessMiddleware],
  async function (req: Request, res: Response) {
    return await unsubscribeUserToChatController(req, res);
  },
);
export default router;
