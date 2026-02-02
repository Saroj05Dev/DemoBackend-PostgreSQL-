export const errorHandler = (err, req, res, next) => {
  console.error(`Error occurred: ${err.message}`);
  console.error(`Stack trace: ${err.stack}`);
  console.error(`Request URL: ${req.method} ${req.url}`);
  console.error(`Request Body:`, req.body);

  // Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.details.map(detail => ({
        field: detail.path[0],
        message: detail.message
      }))
    });
  }

  // Drizzle/Database errors
  if (err.code === '23505') { // Unique constraint violation
    return res.status(409).json({
      success: false,
      message: "Resource already exists"
    });
  }

  if (err.code === '23503') { // Foreign key constraint violation
    return res.status(400).json({
      success: false,
      message: "Invalid reference"
    });
  }

  if (err.code === '23502') { // Not null violation
    return res.status(400).json({
      success: false,
      message: "Required field is missing"
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    });
  }

  // Custom application errors
  if (err.message === "User with this email already exists") {
    return res.status(409).json({
      success: false,
      message: "User with this email already exists"
    });
  }

  if (err.message === "Invalid email or password") {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  if (err.message === "User not found") {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  // Default error (don't expose internal errors to client)
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};