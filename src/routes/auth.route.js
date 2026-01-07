import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sai Jyothula
 *               email:
 *                 type: string
 *                 example: sai@example.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MEMBER]
 *                 example: MEMBER
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 665fabc12345
 *               name: Sai Jyothula
 *               email: sai@example.com
 *               role: MEMBER
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             example:
 *               message: Validation failed
 *               errors:
 *                 - field: email
 *                   message: Email is missing
 */

router.post("/register", validateBody(registerSchema), register);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: sai@example.com
 *               password:
 *                 type: string
 *                 example: Strong@123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "4f9c1a...encrypted.jwt.token"
 *               user:
 *                 id: 665fabc12345
 *                 name: Sai Jyothula
 *                 email: sai@example.com
 *                 role: MEMBER
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid credentials
 */

router.post("/login", validateBody(loginSchema), login);

export default router;
