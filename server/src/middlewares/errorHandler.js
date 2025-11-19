const { errorResponse } = require("../utils/responseFormatter");

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error classes for better error handling
class ValidationError extends AppError {
  constructor(message, errors = null) {
    super(message, 400);
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource conflict") {
    super(message, 409);
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // Handle specific error types
  if (err.name === "ValidationError" && err.errors) {
    // Mongoose validation error
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => e.message);
  } else if (err.name === "CastError") {
    // Mongoose cast error (invalid ID format)
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    message = "Duplicate entry. Resource already exists";
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err.errors) {
    // Custom validation errors
    errors = err.errors;
  }

  // Log error details
  console.error("Error:", {
    statusCode,
    message,
    path: req.originalUrl,
    method: req.method,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });

  // Send error response
  const response = errorResponse(message, statusCode, errors);
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// 404 Not Found handler
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  errorHandler,
  notFoundHandler,
};

