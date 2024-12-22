import { Router, Request, Response } from 'express';
import {
  changeMessageController,
  deleteMessageController,
  getMessagesController,
} from '../controllers/messageControllers';
import authMiddleware from '../middleware/authMiddleware';
import checkMessageAccessMiddleware from '../middleware/checkMessageAccessMiddleware';

/**
 * @swagger
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      required:
 *        - context
 *        - senderId
 *      properties:
 *        id:
 *          type: number
 *          description: The message id
 *        context:
 *          type: string
 *          description: The message context
 *        createAt:
 *          type: string
 *          format: date-time
 *          description: The date of message created
 *        updateAt:
 *          type: string
 *          format: date-time
 *          description: The date of message updated
 *        senderId:
 *          type: number
 *          description: The User id send this message
 *        chatId:
 *          type: number
 *          description: The id of the chat in which this message was sent
 *      example:
 *        id: 1
 *        context: "Hi Daleya, How are you?"
 *        createAt: "2024-08-27 15:38:46.551434"
 *        updateAt: "2024-08-27 15:38:46.551434"
 *        senderId: 1
 *        chatId: 1
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: The message managing API
 * /messages/{id}:
 *  delete:
 *    summary: Delete message by id
 *    tags: [Messages]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The message id
 *    responses:
 *      200:
 *        description: Deleted Message
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
 *                 message: "Message deleted"
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref:'#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 *  put:
 *    summary: Update user data by id
 *    tags: [Messages]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The message id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              context:
 *                type: string
 *                description: The message context
 *            example:
 *               context: "Are you ok?"
 *    responses:
 *      200:
 *        description: Update message
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Message'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      403:
 *        $ref:'#/components/responses/403'
 *      404:
 *        $ref: '#/components/responses/404'
 *      409:
 *        $ref: '#/components/responses/409'
 *      500:
 *        $ref: '#/components/responses/500'
 * /messages/chats/{chatId}:
 *  get:
 *    summary: get message in chat by chatId
 *    tags: [Messages]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: chatId
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The chat id
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: Offset of message
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: Limit of message
 *    responses:
 *      200:
 *        description: The messages in this chat
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Message'
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

router.delete(
  '/:id',
  [authMiddleware, checkMessageAccessMiddleware],
  async function (req: Request, res: Response) {
    return await deleteMessageController(req, res);
  },
);

router.put(
  '/:chatId',
  [authMiddleware, checkMessageAccessMiddleware],
  async function (req: Request, res: Response) {
    return await changeMessageController(req, res);
  },
);
router.get(
  '/chats/:id',
  [authMiddleware, checkMessageAccessMiddleware],
  async function (req: Request, res: Response) {
    return await getMessagesController(req, res);
  },
);
export default router;
