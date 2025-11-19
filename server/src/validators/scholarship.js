const { body, validationResult } = require("express-validator");

// Validation rules for create scholarship (required fields)
const createScholarshipValidation = [
  body("titre")
    .notEmpty()
    .withMessage("Titre is required")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Titre must be between 3 and 200 characters"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("organisateur")
    .notEmpty()
    .withMessage("Organisateur is required")
    .trim(),
  body("date_limite")
    .notEmpty()
    .withMessage("Date limite is required")
    .isISO8601()
    .withMessage("Date limite must be a valid date"),
  body("pays")
    .optional()
    .isArray()
    .withMessage("Pays must be an array"),
  body("niveau")
    .optional()
    .isArray()
    .withMessage("Niveau must be an array"),
  body("domaine")
    .optional()
    .isArray()
    .withMessage("Domaine must be an array"),
  body("montant")
    .optional()
    .isNumeric()
    .withMessage("Montant must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Montant cannot be negative");
      }
      return true;
    }),
  body("age_min")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age min must be a non-negative integer"),
  body("age_max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age max must be a non-negative integer"),
  body("sexe")
    .optional()
    .isIn(["Male", "Female", "Any"])
    .withMessage("Sexe must be Male, Female, or Any"),
  body("statut_publication")
    .optional()
    .isBoolean()
    .withMessage("Statut publication must be a boolean"),
  body("badge_verifie")
    .optional()
    .isBoolean()
    .withMessage("Badge verifie must be a boolean"),
  body("premium")
    .optional()
    .isBoolean()
    .withMessage("Premium must be a boolean"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
];

// Validation rules for update scholarship (all fields optional)
const updateScholarshipValidation = [
  body("titre")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Titre must be between 3 and 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("organisateur")
    .optional()
    .trim(),
  body("date_limite")
    .optional()
    .isISO8601()
    .withMessage("Date limite must be a valid date"),
  body("pays")
    .optional()
    .isArray()
    .withMessage("Pays must be an array"),
  body("niveau")
    .optional()
    .isArray()
    .withMessage("Niveau must be an array"),
  body("domaine")
    .optional()
    .isArray()
    .withMessage("Domaine must be an array"),
  body("montant")
    .optional()
    .isNumeric()
    .withMessage("Montant must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Montant cannot be negative");
      }
      return true;
    }),
  body("age_min")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age min must be a non-negative integer"),
  body("age_max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age max must be a non-negative integer"),
  body("sexe")
    .optional()
    .isIn(["Male", "Female", "Any"])
    .withMessage("Sexe must be Male, Female, or Any"),
  body("statut_publication")
    .optional()
    .isBoolean()
    .withMessage("Statut publication must be a boolean"),
  body("badge_verifie")
    .optional()
    .isBoolean()
    .withMessage("Badge verifie must be a boolean"),
  body("premium")
    .optional()
    .isBoolean()
    .withMessage("Premium must be a boolean"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
];

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        errors: errors.array(),
      },
    });
  }
  next();
};

module.exports = {
  createScholarshipValidation,
  updateScholarshipValidation,
  validate,
};

