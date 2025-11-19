const express = require("express");
const router = express.Router();

// Import admin route modules
const scholarshipRoutes = require("./scholarships");
const userRoutes = require("./users");

// Mount admin routes
router.use("/scholarships", scholarshipRoutes);
router.use("/users", userRoutes);

// Add more admin routes here
// router.use("/jobs", jobRoutes);

module.exports = router;


