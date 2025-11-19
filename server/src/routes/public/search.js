const express = require("express");
const router = express.Router();
const { search } = require("../../controllers/searchController");

/**
 * @swagger
 * /public/search:
 *   get:
 *     summary: Unified search across scholarships and jobs
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, scholarships, jobs]
 *           default: all
 *         description: Search type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: pays
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: niveau
 *         schema:
 *           type: string
 *         description: Filter by education level
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     query:
 *                       type: string
 *                     type:
 *                       type: string
 *                     results:
 *                       type: object
 *                       properties:
 *                         scholarships:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Scholarship'
 *                         jobs:
 *                           type: array
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */
router.get("/", search);

module.exports = router;

