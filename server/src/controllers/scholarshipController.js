const Scholarship = require("../models/Scholarship");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Get all scholarships (public)
 * GET /api/public/scholarships
 */
const getAllScholarships = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      pays,
      niveau,
      domaine,
      type_bourse,
      organisateur,
      montant_min,
      montant_max,
      statut_publication,
      badge_verifie,
      premium,
      sort = "-createdAt",
      search,
    } = req.query;

    const filter = {};

    if (statut_publication !== undefined) {
      filter.statut_publication = statut_publication === "true";
    } else {
      filter.statut_publication = true;
    }

    if (pays) {
      filter.pays = { $in: Array.isArray(pays) ? pays : [pays] };
    }

    if (niveau) {
      filter.niveau = { $in: Array.isArray(niveau) ? niveau : [niveau] };
    }

    if (domaine) {
      filter.domaine = { $in: Array.isArray(domaine) ? domaine : [domaine] };
    }

    if (type_bourse) {
      filter.type_bourse = type_bourse;
    }

    if (organisateur) {
      filter.organisateur = { $regex: organisateur, $options: "i" };
    }

    if (montant_min || montant_max) {
      filter.montant = {};
      if (montant_min) filter.montant.$gte = Number(montant_min);
      if (montant_max) filter.montant.$lte = Number(montant_max);
    }

    if (badge_verifie !== undefined) {
      filter.badge_verifie = badge_verifie === "true";
    }

    if (premium !== undefined) {
      filter.premium = premium === "true";
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
      .select("-admin_id")
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
 * Get single scholarship by ID
 * GET /api/public/scholarships/:id
 */
const getScholarshipById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const scholarship = await Scholarship.findById(id)
      .select("-admin_id")
      .lean();

    if (!scholarship) {
      return next(new AppError("Scholarship not found", 404));
    }

    if (!scholarship.statut_publication) {
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

module.exports = {
  getAllScholarships,
  getScholarshipById,
};


