import express, { Request, Response } from 'express'
import { loginController } from '../controllers/userControllers'
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          description: The username of login
 *        password:
 *          type: string
 *          description: The password of this username
 *      example:
 *        username: "Daleya"
 *        password: "123456"
 */

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login API
 * /login:
 *  post:
 *    summary: Login user
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      201:
 *        description: The user is logged in
 *        content:
 *          application/json:
 *            schema:
 *             type: object
 *             required:
 *               - jwt
 *             properties:
 *               jwt:
 *                 type: string
 *                 description: user jwt
 *             example:
 *                 jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsInVzZXJuYW1lIjoiYWxpaSIsInBhc3N3b3JkIjoiJDJhJDEyJE9zSmRSV2toeG8wZklPQ2FjbWRxTU9WOUVEelpHS1owSmtIajFKOEZKRFFyTEI2Y3pPeE1DIiwiaWF0IjoxNzI1MDMwNDY3LCJleHAiOjE3MjUwMzA1ODd9.KBG1iFF1RM06SAwEBeRrM6ki1FmYq8OULKj311M7nck  "
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *              example:
 *                message: "Bad Request"
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *              example:
 *                message: "Unauthorized"
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *              example:
 *                message: "User Not Found"
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - message
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *              example:
 *                message: "Internal Server Error"
 */

const router = express.Router()
router.post('/', async function (req: Request, res: Response) {
  return await loginController(req, res)
})

export default router
