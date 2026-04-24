import fs from "fs";
import path from "path";
import { ErrorHandler } from "../middlewares/error.js";

/**
 * Stream a file for download
 */
export const streamDownload = (filePath, res, originalName) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new ErrorHandler(404, "File not found");
        }
        res.download(filePath, originalName, (err) => {
            if (err) {
                // If headers are already sent, we can't send a JSON error
                if (!res.headersSent) {
                    return res.status(500).json({
                        success: false,
                        error: "Error downloading file",
                    });
                }
            }
        });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: "Error streaming file",
        });
    }
};

/**
 * Delete a file from the filesystem
 */
export const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error deleting file at ${filePath}:`, error);
        return false;
    }
};

/**
 * Get file statistics (size, extension, etc.)
 */
export const getFileStats = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const stats = fs.statSync(filePath);
        const ext = path.extname(filePath);
        return {
            size: stats.size,
            extension: ext,
            mtime: stats.mtime,
            birthtime: stats.birthtime
        };
    } catch (error) {
        console.error(`Error getting file stats for ${filePath}:`, error);
        return null;
    }
};