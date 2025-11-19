const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SaaS Scholarship Platform API",
      version: "1.0.0",
      description: "A comprehensive API for managing scholarships and job opportunities",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "User ID",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              description: "User role",
            },
            favorites: {
              type: "object",
              properties: {
                scholarships: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                jobs: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Scholarship: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Scholarship ID",
            },
            titre: {
              type: "string",
              description: "Scholarship title",
            },
            description: {
              type: "string",
              description: "Scholarship description",
            },
            pays: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Countries",
            },
            niveau: {
              type: "array",
              items: {
                type: "string",
                enum: ["High School", "Undergraduate", "Graduate", "Postgraduate", "PhD", "Any"],
              },
              description: "Education levels",
            },
            domaine: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Fields of study",
            },
            type_bourse: {
              type: "string",
              description: "Scholarship type",
            },
            organisateur: {
              type: "string",
              description: "Organizer name",
            },
            montant: {
              type: "number",
              description: "Scholarship amount",
            },
            date_limite: {
              type: "string",
              format: "date-time",
              description: "Application deadline",
            },
            statut_publication: {
              type: "boolean",
              description: "Publication status",
            },
            badge_verifie: {
              type: "boolean",
              description: "Verified badge",
            },
            premium: {
              type: "boolean",
              description: "Premium status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
                errors: {
                  type: "array",
                  items: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
            },
            data: {
              type: "object",
            },
          },
        },
        Pagination: {
          type: "object",
          properties: {
            currentPage: {
              type: "integer",
            },
            totalPages: {
              type: "integer",
            },
            totalItems: {
              type: "integer",
            },
            itemsPerPage: {
              type: "integer",
            },
            hasNextPage: {
              type: "boolean",
            },
            hasPrevPage: {
              type: "boolean",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/**/*.js", "./index.js"], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};

