import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { borrowBook, returnBook } from "../controllers/borrow.controller.js";
import { validateParams } from "../middlewares/validate.middleware.js";
import { borrowBookSchema, returnBookSchema } from "../validators/borrow.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: Borrowing APIs
 */

/**
 * @swagger
 * /api/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         example: 665fabcd111
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 7788borrow123
 *               userId: 665fuser123
 *               bookId: 665fabcd111
 *               status: BORROWED
 *               borrowedAt: 2026-01-07T10:00:00Z
 */

router.post("/:bookId", auth, validateParams(borrowBookSchema), borrowBook);

/**
 * @swagger
 * /api/borrow/return/{borrowId}:
 *   post:
 *     summary: Return borrowed book
 *     tags: [Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: borrowId
 *         required: true
 *         example: 7788borrow123
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Book returned successfully
 */

router.post(
  "/return/:borrowId",
  auth,
  validateParams(returnBookSchema),
  returnBook
);


export default router;
