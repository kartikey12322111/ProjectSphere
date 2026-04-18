import { ApiError } from "../utils/ApiError.js";

/**
 * Global Error Handling Middleware
 * Catch-all for all errors in the application. Standardizes the error response.
 */
export const errorMiddleware = (err, req, res, next) => {
    let error = err;

    // Check if the error is an instance of ApiError
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === "ValidationError" ? 400 : 500);
        const message = error.message || "Internal Server Error";
        error = new ApiError(statusCode, message, err?.errors || [], err.stack);
    }

    // Specific Mongoose Error Handling
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ApiError(400, message);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid Token. Please login again.";
        error = new ApiError(401, message);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Token expired. Please login again.";
        error = new ApiError(401, message);
    }
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ApiError(400, message);
    }

    const response = {
        success: false,
        message: error.message,
        errors: error.errors,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    };

    return res.status(error.statusCode).json(response);
};

export default errorMiddleware;
