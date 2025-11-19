/**
 * Response formatting utilities
 * Standardizes API responses across the application
 */

/**
 * Success response formatter
 * @param {any} data - Response data
 * @param {string} message - Success message (optional)
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {object} Formatted success response
 */
const successResponse = (data, message = null, statusCode = 200) => {
  const response = {
    success: true,
    data,
  };

  if (message) {
    response.message = message;
  }

  return response;
};

/**
 * Error response formatter
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {any} errors - Additional error details (optional)
 * @returns {object} Formatted error response
 */
const errorResponse = (message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    error: {
      message,
    },
  };

  if (errors) {
    response.error.errors = errors;
  }

  return response;
};

/**
 * Pagination response formatter
 * @param {any[]} items - Array of items
 * @param {object} pagination - Pagination metadata
 * @param {string} message - Success message (optional)
 * @returns {object} Formatted pagination response
 */
const paginatedResponse = (items, pagination, message = null) => {
  const response = {
    success: true,
    data: {
      items,
      pagination,
    },
  };

  if (message) {
    response.message = message;
  }

  return response;
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};

