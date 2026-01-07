import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";
import { validateQuery } from "../middlewares/validate.middleware.js";
import { reportQuerySchema } from "../validators/report.schema.js";

import {
  mostBorrowedBooks,
  activeMembers,
  bookAvailability
} from "../controllers/report.controller.js";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Aggregation reports (Admin only)
 */

/**
 * @swagger
 * /api/reports/most-borrowed:
 *   get:
 *     summary: Get most borrowed books
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Most borrowed books report
 *         content:
 *           application/json:
 *             example:
 *               - title: Clean Code
 *                 author: Robert C. Martin
 *                 borrowCount: 15
 *               - title: Atomic Habits
 *                 author: James Clear
 *                 borrowCount: 12
 */

router.get("/most-borrowed", auth, role("ADMIN"), mostBorrowedBooks);

/**
 * @swagger
 * /api/reports/active-members:
 *   get:
 *     summary: Most active members
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Report generated
 */
router.get("/active-members", auth, role("ADMIN"), activeMembers);

/**
 * @swagger
 * /api/reports/availability:
 *   get:
 *     summary: Book availability report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Availability report
 *         content:
 *           application/json:
 *             example:
 *               - title: Clean Code
 *                 totalCopies: 10
 *                 availableCopies: 7
 *                 borrowedCopies: 3
 */

router.get("/availability", auth, role("ADMIN"), bookAvailability);


export default router;
