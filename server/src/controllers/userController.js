const User = require("../models/User");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Get user profile
 * GET /api/public/users/profile
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          favorites: user.favorites,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * PUT /api/public/users/profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { email, firstName, lastName } = req.body;
    const userId = req.user.id;

    // Check if email is being updated and if it's already taken
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: userId },
      });

      if (existingUser) {
        return next(new AppError("Email is already in use", 409));
      }
    }

    // Update user
    const updateData = {};
    if (email) updateData.email = email.toLowerCase();
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(new AppError(messages.join(", "), 400));
    }
    next(error);
  }
};

/**
 * Change password
 * PUT /api/public/users/change-password
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Find user and include password (since it's select: false by default)
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return next(new AppError("Current password is incorrect", 401));
    }

    // Update password (will be hashed automatically by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(new AppError(messages.join(", "), 400));
    }
    next(error);
  }
};

/**
 * Delete user account
 * DELETE /api/public/users/profile
 */
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
};

