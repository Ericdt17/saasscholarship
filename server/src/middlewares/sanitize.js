/**
 * Request sanitization middleware
 * Cleans user input to prevent XSS attacks and injection
 */

/**
 * Recursively sanitize strings in an object
 * Removes HTML tags and dangerous characters
 */
const sanitizeString = (str) => {
  if (typeof str !== "string") return str;

  return str
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>]/g, "") // Remove remaining angle brackets
    .trim(); // Remove leading/trailing whitespace
};

/**
 * Recursively sanitize an object
 */
const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "string") {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }

  if (typeof obj === "object") {
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
};

/**
 * Middleware to sanitize request body, query, and params
 */
const sanitizeRequest = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

module.exports = {
  sanitizeRequest,
  sanitizeString,
  sanitizeObject,
};

