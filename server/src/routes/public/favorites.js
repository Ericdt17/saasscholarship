const express = require("express");
const router = express.Router();
const {
  addScholarshipToFavorites,
  removeScholarshipFromFavorites,
  getUserFavorites,
} = require("../../controllers/favoritesController");
const { authenticate } = require("../../middlewares/auth");

// All favorites routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /public/favorites:
 *   get:
 *     summary: Get user favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User favorites
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
 *                     favorites:
 *                       type: object
 *                       properties:
 *                         scholarships:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Scholarship'
 *                         jobs:
 *                           type: array
 *       401:
 *         description: Unauthorized
 */
router.get("/", getUserFavorites);

/**
 * @swagger
 * /public/favorites/scholarships/{id}:
 *   post:
 *     summary: Add scholarship to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Scholarship ID
 *     responses:
 *       200:
 *         description: Scholarship added to favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Scholarship not found
 */
router.post("/scholarships/:id", addScholarshipToFavorites);

/**
 * @swagger
 * /public/favorites/scholarships/{id}:
 *   delete:
 *     summary: Remove scholarship from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Scholarship ID
 *     responses:
 *       200:
 *         description: Scholarship removed from favorites
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Scholarship not in favorites
 */
router.delete("/scholarships/:id", removeScholarshipFromFavorites);

// Job favorites routes (for future implementation)
// router.post("/jobs/:id", addJobToFavorites);
// router.delete("/jobs/:id", removeJobFromFavorites);

module.exports = router;


