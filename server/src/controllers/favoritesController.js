const User = require("../models/User");
const Scholarship = require("../models/Scholarship");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Add scholarship to favorites
 * POST /api/public/favorites/scholarships/:id
 */
const addScholarshipToFavorites = async (req, res, next) => {
  try {
    const { id } = req.params; // Scholarship ID
    const userId = req.user.id;

    // Check if scholarship exists
    const scholarship = await Scholarship.findById(id);
    if (!scholarship) {
      return next(new AppError("Scholarship not found", 404));
    }

    // Check if scholarship is published
    if (!scholarship.statut_publication) {
      return next(new AppError("Scholarship is not available", 404));
    }

    // Get user and check if already in favorites
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Check if already in favorites
    if (user.favorites.scholarships.includes(id)) {
      return res.json({
        success: true,
        message: "Scholarship is already in favorites",
        data: {
          favorites: user.favorites,
        },
      });
    }

    // Add to favorites
    user.favorites.scholarships.push(id);
    await user.save();

    // Populate favorites for response
    await user.populate("favorites.scholarships");

    res.json({
      success: true,
      message: "Scholarship added to favorites",
      data: {
        favorites: user.favorites,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid scholarship ID", 400));
    }
    next(error);
  }
};

/**
 * Remove scholarship from favorites
 * DELETE /api/public/favorites/scholarships/:id
 */
const removeScholarshipFromFavorites = async (req, res, next) => {
  try {
    const { id } = req.params; // Scholarship ID
    const userId = req.user.id;

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Check if in favorites
    const index = user.favorites.scholarships.indexOf(id);
    if (index === -1) {
      return next(new AppError("Scholarship is not in favorites", 404));
    }

    // Remove from favorites
    user.favorites.scholarships.splice(index, 1);
    await user.save();

    // Populate favorites for response
    await user.populate("favorites.scholarships");

    res.json({
      success: true,
      message: "Scholarship removed from favorites",
      data: {
        favorites: user.favorites,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid scholarship ID", 400));
    }
    next(error);
  }
};

/**
 * Get user favorites
 * GET /api/public/favorites
 */
const getUserFavorites = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "favorites.scholarships",
      select: "-admin_id", // Don't expose admin_id
      match: { statut_publication: true }, // Only show published scholarships
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      data: {
        favorites: {
          scholarships: user.favorites.scholarships.filter(
            (scholarship) => scholarship !== null
          ),
          jobs: user.favorites.jobs, // Empty for now, will be populated when jobs are added
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addScholarshipToFavorites,
  removeScholarshipFromFavorites,
  getUserFavorites,
};


