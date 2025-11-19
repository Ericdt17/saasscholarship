const { verifyToken, extractTokenFromHeader } = require("../utils/jwt");
const { AppError } = require("./errorHandler");

/**
 * Authentication middleware
 * Verifies JWT token and attaches user info to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return next(
        new AppError("Authentication required. Please provide a token.", 401)
      );
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach user info to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error.message === "Token has expired") {
      return next(new AppError("Token has expired. Please login again.", 401));
    } else if (error.message === "Invalid token") {
      return next(new AppError("Invalid token. Please login again.", 401));
    } else {
      return next(new AppError("Authentication failed.", 401));
    }
  }
};

/**
 * Admin authorization middleware
 * Must be used after authenticate middleware
 * Checks if user has admin role
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError("Authentication required before authorization check.", 401)
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new AppError("Admin access required. Insufficient permissions.", 403)
    );
  }

  next();
};

/**
 * Optional authentication middleware
 * Verifies token if present, but doesn't fail if missing
 * Useful for routes that work for both authenticated and anonymous users
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (token) {
      const decoded = verifyToken(token);
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user (optional auth)
    next();
  }
};

module.exports = {
  authenticate,
  requireAdmin,
  optionalAuth,
};

