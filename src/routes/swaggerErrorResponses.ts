/**
 * @swagger
 * components:
 *   responses:
 *     400:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Bad Request"
 *     401:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Unauthorized"
 *     403:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Forbidden"
 *     404:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Not Found"
 *     409:
 *       description: Conflict
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Conflict"
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *                 description: error message
 *             example:
 *               message: "Internal Server Error"
 */
