import { Router, Request, Response } from 'express'
import {
  changeDataController,
  deleteUserController,
  findUserController,
  getAllUsersController,
} from '../controllers/userControllers'
import { getAllChatsUserController } from '../controllers/userControllers'
import authMiddleware from '../middleware/authMiddleware'
import checkUserAccessMiddleware from '../middleware/checkUserAccessMiddleware'

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - username
 *      properties:
 *        id:
 *          type: number
 *          description: UserId
 *        firstName:
 *          type: string
 *          description: The firstName of user
 *        lastName:
 *          type: string
 *          description: The lastName of user
 *        username:
 *          type: string
 *          description: The username of user
 *        age:
 *          type: number
 *          description: The age of user
 *        createAt:
 *          type: string
 *          format: date-time
 *          description: The date of user create account
 *        updateAt:
 *          type: string
 *          format: date-time
 *          description: The date of user update account
 *      example:
 *        id: 1
 *        firstName: "Kosar"
 *        lastName: "Asadi pour"
 *        username: "Daleya"
 *        age: 25
 *        createAt: "2024-08-27 15:38:46.551434"
 *        updateAt: "2024-08-27 15:38:46.551434"
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The User managing API
 * /users:
 *  get:
 *    summary: 'Get a list of users'
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: Offset of data
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: Limit of data
 *    responses:
 *      200:
 *        description: Information about users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        $ref: '#/components/responses/400'
 *      401:
 *        $ref: '#/components/responses/401'
 *      404:
 *        $ref: '#/components/responses/404'
 *      500:
 *        $ref: '#/components/responses/500'
 * /users/{id}:
 *  get:
 *    summary: Get a User by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Information about this user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
 *    summary: Delete user by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Deleted user
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
 *                 message: "User deleted"
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
 *    summary: Update user data by id
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                description: The user firstName
 *              lastName:
 *                type: string
 *                description: The user lastName
 *              username:
 *                type: string
 *                description: The user username
 *              age:
 *                type: number
 *                description: The user age
 *            example:
 *               firstName: "Kosar"
 *               lastName: "Asadi pour"
 *               username: "Daleya"
 *               age: 25
 *    responses:
 *      200:
 *        description: Update user data
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
 * /users/{id}/chats:
 *  get:
 *    summary: Get all chats user
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          format: int64
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: Get user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
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
const router = Router()
router.get(
  '/:id',
  [authMiddleware, checkUserAccessMiddleware],
  async function (req: Request, res: Response) {
    return await findUserController(req, res)
  },
)

router.get('/', authMiddleware, async function (req: Request, res: Response) {
  return await getAllUsersController(req, res)
})

router.get(
  '/:id/chats',
  [authMiddleware, checkUserAccessMiddleware],
  async function (req: Request, res: Response) {
    return await getAllChatsUserController(req, res)
  },
)
router.delete(
  '/:id',
  [authMiddleware, checkUserAccessMiddleware],
  async function (req: Request, res: Response) {
    return await deleteUserController(req, res)
  },
)

router.put(
  '/:id',
  [authMiddleware, checkUserAccessMiddleware],
  async function (req: Request, res: Response) {
    return await changeDataController(req, res)
  },
)
export default router
