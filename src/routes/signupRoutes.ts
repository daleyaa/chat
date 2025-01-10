import { Router, Request, Response } from 'express';
import { signupController } from '../controllers/userControllers';

/**
 * @swagger
 * components:
 *  schemas:
 *    Signup:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - username
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *          description: The firstName of user
 *        lastName:
 *          type: string
 *          description: The lastName of user
 *        username:
 *          type: string
 *          description: The username of login
 *        password:
 *          type: string
 *          format: password
 *          pattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9].*[0-9])(?=.*[a-z]).{6}$"
 *          description: The password of this username
 *        age:
 *          type: number
 *          description: The age of login
 *      example:
 *        firstName: "Kosar"
 *        lastName: "Asadi pour"
 *        username: "Daleya"
 *        password: "123456"
 *        age: 25
 */

/**
 * @swagger
 * tags:
 *  name: Signup
 *  description: Signup API
 * /signup:
 *  post:
 *    summary: Signup user
 *    tags: [Signup]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Signup'
 *    responses:
 *      201:
 *        description: User is registered
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/User'
 *                - type: object
 *                  properties:
 *                    jwt:
 *                      type: string
 *                      description: user jwt
 *                  example:
 *                    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsInVzZXJuYW1lIjoiYWxpaSIsInBhc3N3b3JkIjoiJDJhJDEyJE9zSmRSV2toeG8wZklPQ2FjbWRxTU9WOUVEelpHS1owSmtIajFKOEZKRFFyTEI2Y3pPeE1DIiwiaWF0IjoxNzI1MDMwNDY3LCJleHAiOjE3MjUwMzA1ODd9.KBG1iFF1RM06SAwEBeRrM6ki1FmYq8OULKj311M7nck"
 *
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
 *      409:
 *        description: Conflict
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
 *                message: "Conflict"
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
const router = Router();
router.post('/', async function (req: Request, res: Response) {
  return await signupController(req, res);
});

export default router;
