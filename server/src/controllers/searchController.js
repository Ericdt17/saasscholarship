const Scholarship = require("../models/Scholarship");
const { AppError } = require("../middlewares/errorHandler");

/**
 * Unified search endpoint
 * GET /api/public/search
 * Searches across scholarships (and jobs in the future)
 */
const search = async (req, res, next) => {
  try {
    const {
      q, // Search query (text search)
      type = "all", // "scholarships", "jobs", or "all"
      page = 1,
      limit = 10,
      pays,
      niveau,
      domaine,
      type_bourse,
      montant_min,
      montant_max,
      badge_verifie,
      premium,
      sort = "-createdAt",
    } = req.query;

    const results = {
      scholarships: [],
      jobs: [],
    };

    const pagination = {
      currentPage: parseInt(page),
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: parseInt(limit),
      hasNextPage: false,
      hasPrevPage: false,
    };

    // Search scholarships if type is "all" or "scholarships"
    if (type === "all" || type === "scholarships") {
      const scholarshipFilter = {
        statut_publication: true, // Only published
      };

      // Text search
      if (q) {
        scholarshipFilter.$text = { $search: q };
      }

      // Apply filters
      if (pays) {
        scholarshipFilter.pays = {
          $in: Array.isArray(pays) ? pays : [pays],
        };
      }

      if (niveau) {
        scholarshipFilter.niveau = {
          $in: Array.isArray(niveau) ? niveau : [niveau],
        };
      }

      if (domaine) {
        scholarshipFilter.domaine = {
          $in: Array.isArray(domaine) ? domaine : [domaine],
        };
      }

      if (type_bourse) {
        scholarshipFilter.type_bourse = type_bourse;
      }

      if (montant_min || montant_max) {
        scholarshipFilter.montant = {};
        if (montant_min) scholarshipFilter.montant.$gte = Number(montant_min);
        if (montant_max) scholarshipFilter.montant.$lte = Number(montant_max);
      }

      if (badge_verifie !== undefined) {
        scholarshipFilter.badge_verifie = badge_verifie === "true";
      }

      if (premium !== undefined) {
        scholarshipFilter.premium = premium === "true";
      }

      // Calculate pagination for scholarships
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
      const scholarships = await Scholarship.find(scholarshipFilter)
        .select("-admin_id")
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum)
        .lean();

      const totalScholarships = await Scholarship.countDocuments(
        scholarshipFilter
      );

      results.scholarships = scholarships;
      pagination.totalItems += totalScholarships;
    }

    // Search jobs (placeholder for future)
    if (type === "all" || type === "jobs") {
      // Jobs search will be implemented when Job model is added
      results.jobs = [];
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const totalPages = Math.ceil(pagination.totalItems / limitNum);

    pagination.totalPages = totalPages;
    pagination.hasNextPage = pageNum < totalPages;
    pagination.hasPrevPage = pageNum > 1;

    res.json({
      success: true,
      data: {
        query: q || "",
        type,
        results,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
};

