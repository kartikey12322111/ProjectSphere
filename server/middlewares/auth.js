import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.js";

/**
 * Middleware to check if the user is authenticated
 */
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError(401, "Please login to access this resource."));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-resetPasswordToken -resetPasswordExpire");

        if (!req.user) {
            return next(new ApiError(404, "User not found with this id."));
        }

        next();
    } catch (error) {
        return next(new ApiError(401, "Token is invalid or expired."));
    }
});

/**
 * Middleware to check if the user has the required role
 */
export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role?.toLowerCase();
        const allowed = roles.map(r => r.toLowerCase());

        console.log(`[DEBUG] Authorization check: user role -> ${userRole}, allowed roles -> ${allowed}`);

        if (!allowed.includes(userRole)) {
            console.log(`[DEBUG] Authorization failed: ${userRole} not in ${allowed}`);
            return next(new ApiError(403, "Access denied. You do not have the required permissions."));
        }

        next();
    };
};
