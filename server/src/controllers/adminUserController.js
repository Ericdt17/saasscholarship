const User = require("../models/User");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Get all users (admin view)
 * GET /api/admin/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      role,
      search,
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    // Filter by role
    if (role) {
      filter.role = role;
    }

    // Text search (email, firstName, lastName)
    if (search) {
      filter.$or = [
        { email: { $regex: search, $options: "i" } },
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    let sortObj = {};
    if (sort.startsWith("-")) {
      sortObj[sort.substring(1)] = -1;
    } else {
      sortObj[sort] = 1;
    }

    // Execute query
    const users = await User.find(filter)
      .select("-password") // Never expose passwords
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count
    const total = await User.countDocuments(filter);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage,
          hasPrevPage,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single user by ID (admin view)
 * GET /api/admin/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password")
      .populate("favorites.scholarships", "-admin_id")
      .lean();

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid user ID", 400));
    }
    next(error);
  }
};

/**
 * Update user (admin)
 * PUT /api/admin/users/:id
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, role } = req.body;

    // Check if email is being updated and if it's already taken
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });

      if (existingUser) {
        return next(new AppError("Email is already in use", 409));
      }
    }

    // Build update object
    const updateData = {};
    if (email) updateData.email = email.toLowerCase();
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (role) {
      if (!["user", "admin"].includes(role)) {
        return next(new AppError("Role must be 'user' or 'admin'", 400));
      }
      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean();

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      message: "User updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid user ID", 400));
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(new AppError(messages.join(", "), 400));
    }
    next(error);
  }
};

/**
 * Delete user (admin)
 * DELETE /api/admin/users/:id
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return next(
        new AppError("You cannot delete your own account", 400)
      );
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid user ID", 400));
    }
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

