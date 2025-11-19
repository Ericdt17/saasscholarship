const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "Titre is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    pays: [String], // Array of countries
    niveau: [
      {
        type: String,
        enum: [
          "High School",
          "Undergraduate",
          "Graduate",
          "Postgraduate",
          "PhD",
          "Any",
        ],
      },
    ],
    domaine: [String], // Field of study
    type_bourse: {
      type: String,
      trim: true,
    },
    organisateur: {
      type: String,
      required: [true, "Organisateur is required"],
      trim: true,
    },
    avantages_couverts: [String], // Benefits covered
    montant: {
      type: Number,
      min: [0, "Montant cannot be negative"],
    },
    age_min: {
      type: Number,
      min: 0,
    },
    age_max: {
      type: Number,
      min: 0,
    },
    sexe: {
      type: String,
      enum: ["Male", "Female", "Any"],
    },
    nationalite: [String], // Array of nationalities
    langue: [String], // Required languages
    restriction_financiere: {
      type: String,
      trim: true,
    },
    date_ouverture: {
      type: Date,
    },
    date_limite: {
      type: Date,
      required: [true, "Date limite is required"],
    },
    procedure_candidature: {
      type: String,
    },
    liste_pieces: [String], // List of required documents
    lien_officiel: {
      type: String,
      trim: true,
    },
    statut_publication: {
      type: Boolean,
      default: true,
    },
    badge_verifie: {
      type: Boolean,
      default: false,
    },
    date_maj: {
      type: Date,
      default: Date.now,
    },
    tags: [String],
    premium: {
      type: Boolean,
      default: false,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Indexes for search optimization
ScholarshipSchema.index({ titre: "text", description: "text", tags: "text" });
ScholarshipSchema.index({ date_limite: 1 });
ScholarshipSchema.index({ statut_publication: 1 });
ScholarshipSchema.index({ domaine: 1 });
ScholarshipSchema.index({ pays: 1 });
ScholarshipSchema.index({ createdAt: -1 });

const Scholarship = mongoose.model("Scholarship", ScholarshipSchema);

module.exports = Scholarship;

