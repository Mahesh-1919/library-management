import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import { addBook, getBooks, updateBook } from "../controllers/book.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { addBookSchema, updateBookSchema } from "../validators/book.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, totalCopies]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Clean Code
 *               author:
 *                 type: string
 *                 example: Robert C. Martin
 *               genre:
 *                 type: string
 *                 example: Programming
 *               totalCopies:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Book added
 *         content:
 *           application/json:
 *             example:
 *               id: 665fabcd111
 *               title: Clean Code
 *               author: Robert C. Martin
 *               totalCopies: 10
 *               availableCopies: 10
 */

router.post("/", auth, role("ADMIN"), validateBody(addBookSchema), addBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get list of books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *       - in: query
 *         name: limit
 *         example: 10
 *       - in: query
 *         name: genre
 *         example: Programming
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             example:
 *               - id: 665fabcd111
 *                 title: Clean Code
 *                 author: Robert C. Martin
 *                 availableCopies: 7
 *               - id: 665fabcd222
 *                 title: You Don't Know JS
 *                 author: Kyle Simpson
 *                 availableCopies: 5
 */

router.get("/", auth, getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update book (Admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put("/:id", auth, role("ADMIN"), validateBody(updateBookSchema), updateBook);


export default router;
