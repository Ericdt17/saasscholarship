const express = require("express");
const router = express.Router();
const {
  getAllScholarships,
  getScholarshipById,
} = require("../../controllers/scholarshipController");

/**
 * @swagger
 * /public/scholarships:
 *   get:
 *     summary: Get all published scholarships
 *     tags: [Scholarships]
 *     parameters:
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
 *       - in: query
 *         name: domaine
 *         schema:
 *           type: string
 *         description: Filter by field of study
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Text search
 *       - in: query
 *         name: montant_min
 *         schema:
 *           type: number
 *         description: Minimum amount
 *       - in: query
 *         name: montant_max
 *         schema:
 *           type: number
 *         description: Maximum amount
 *     responses:
 *       200:
 *         description: List of scholarships
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
 *                     scholarships:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Scholarship'
 *                     pagination:
 *                       $ref: '#/components/schemas/Pagination'
 */
router.get("/", getAllScholarships);

/**
 * @swagger
 * /public/scholarships/{id}:
 *   get:
 *     summary: Get a single scholarship by ID
 *     tags: [Scholarships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Scholarship ID
 *     responses:
 *       200:
 *         description: Scholarship details
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
 *                     scholarship:
 *                       $ref: '#/components/schemas/Scholarship'
 *       404:
 *         description: Scholarship not found
 *       400:
 *         description: Invalid ID format
 */
router.get("/:id", getScholarshipById);

module.exports = router;


