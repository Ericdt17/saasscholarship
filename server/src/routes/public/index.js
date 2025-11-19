const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth");
const userRoutes = require("./users");
const scholarshipRoutes = require("./scholarships");
const favoritesRoutes = require("./favorites");
const searchRoutes = require("./search");

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/scholarships", scholarshipRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/search", searchRoutes);

// Add more public routes here
// router.use("/jobs", jobRoutes);

module.exports = router;

