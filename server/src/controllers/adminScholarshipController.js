const Scholarship = require("../models/Scholarship");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Get all scholarships (admin view)
 * GET /api/admin/scholarships
 */
const getAllScholarships = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      statut_publication,
      search,
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    if (statut_publication !== undefined) {
      filter.statut_publication = statut_publication === "true";
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let sortObj = {};
    if (sort.startsWith("-")) {
      sortObj[sort.substring(1)] = -1;
    } else {
      sortObj[sort] = 1;
    }

    const scholarships = await Scholarship.find(filter)
      .populate("admin_id", "email firstName lastName")
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Scholarship.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        scholarships,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single scholarship by ID (admin view)
 * GET /api/admin/scholarships/:id
 */
const getScholarshipById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findById(id)
      .populate("admin_id", "email firstName lastName")
      .lean();

    if (!scholarship) {
      return next(new AppError("Scholarship not found", 404));
    }

    res.json({
      success: true,
      data: {
        scholarship,
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
 * Create new scholarship
 * POST /api/admin/scholarships
 */
const createScholarship = async (req, res, next) => {
  try {
    const adminId = req.user.id;

    const scholarshipData = {
      ...req.body,
      admin_id: adminId,
      date_maj: new Date(),
    };

    const scholarship = await Scholarship.create(scholarshipData);

    res.status(201).json({
      success: true,
      message: "Scholarship created successfully",
      data: {
        scholarship,
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
 * Update scholarship
 * PUT /api/admin/scholarships/:id
 */
const updateScholarship = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body,
      date_maj: new Date(),
    };

    const scholarship = await Scholarship.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!scholarship) {
      return next(new AppError("Scholarship not found", 404));
    }

    res.json({
      success: true,
      message: "Scholarship updated successfully",
      data: {
        scholarship,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid scholarship ID", 400));
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return next(new AppError(messages.join(", "), 400));
    }
    next(error);
  }
};

/**
 * Delete scholarship
 * DELETE /api/admin/scholarships/:id
 */
const deleteScholarship = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findByIdAndDelete(id);

    if (!scholarship) {
      return next(new AppError("Scholarship not found", 404));
    }

    res.json({
      success: true,
      message: "Scholarship deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return next(new AppError("Invalid scholarship ID", 400));
    }
    next(error);
  }
};

module.exports = {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
};


