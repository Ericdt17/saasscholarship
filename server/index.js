const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const connectDatabase = require("./src/config/database");
const { startScholarshipScheduler } = require("./src/schedulers/scholarshipScheduler");
const { sanitizeRequest } = require("./src/middlewares/sanitize");

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser middleware with size limits
app.use(express.json({ limit: "10mb" })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Limit URL-encoded payload size

// Request sanitization middleware (clean user input)
app.use(sanitizeRequest);

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Swagger documentation
const { swaggerUi, swaggerSpec } = require("./src/config/swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Import routes
const publicRoutes = require("./src/routes/public");
const adminRoutes = require("./src/routes/admin");

// Import error handlers
const {
  errorHandler,
  notFoundHandler,
} = require("./src/middlewares/errorHandler");

// API routes
app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database first
    await connectDatabase();

    // Start schedulers after database connection
    startScholarshipScheduler();

    // Start listening after database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
