const express = require("express");
const router = express.Router();
const {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} = require("../../controllers/adminScholarshipController");
const {
  createScholarshipValidation,
  updateScholarshipValidation,
  validate,
} = require("../../validators/scholarship");
const { authenticate, requireAdmin } = require("../../middlewares/auth");

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

/**
 * @swagger
 * /admin/scholarships:
 *   get:
 *     summary: Get all scholarships (admin view)
 *     tags: [Admin - Scholarships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: statut_publication
 *         schema:
 *           type: boolean
 *         description: Filter by publication status
 *     responses:
 *       200:
 *         description: List of scholarships
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.get("/", getAllScholarships);

/**
 * @swagger
 * /admin/scholarships/{id}:
 *   get:
 *     summary: Get single scholarship (admin view)
 *     tags: [Admin - Scholarships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scholarship details
 *       404:
 *         description: Scholarship not found
 */
router.get("/:id", getScholarshipById);

/**
 * @swagger
 * /admin/scholarships:
 *   post:
 *     summary: Create new scholarship
 *     tags: [Admin - Scholarships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - description
 *               - organisateur
 *               - date_limite
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               pays:
 *                 type: array
 *                 items:
 *                   type: string
 *               niveau:
 *                 type: array
 *                 items:
 *                   type: string
 *               domaine:
 *                 type: array
 *                 items:
 *                   type: string
 *               montant:
 *                 type: number
 *               date_limite:
 *                 type: string
 *                 format: date-time
 *               statut_publication:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Scholarship created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Admin access required
 */
router.post(
  "/",
  createScholarshipValidation,
  validate,
  createScholarship
);

/**
 * @swagger
 * /admin/scholarships/{id}:
 *   put:
 *     summary: Update scholarship
 *     tags: [Admin - Scholarships]
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
 *             properties:
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               statut_publication:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Scholarship updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Scholarship not found
 */
router.put(
  "/:id",
  updateScholarshipValidation,
  validate,
  updateScholarship
);

/**
 * @swagger
 * /admin/scholarships/{id}:
 *   delete:
 *     summary: Delete scholarship
 *     tags: [Admin - Scholarships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scholarship deleted successfully
 *       404:
 *         description: Scholarship not found
 */
router.delete("/:id", deleteScholarship);

module.exports = router;

