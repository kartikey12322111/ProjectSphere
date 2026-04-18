import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Construct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenvConfig({ path: path.join(__dirname, "../.env") });

/**
 * Centralized Configuration Object
 * Manages all environment variables and provides defaults where safe.
 */
const _config = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE || 7,
    
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    NODE_ENV: process.env.NODE_ENV || "development"
};

// Simple validation to ensure critical variables are present
const requiredConfig = ["MONGO_URI", "JWT_SECRET"];
for (const key of requiredConfig) {
    if (!_config[key]) {
        console.warn(`WARNING: Missing required configuration for ${key}. Check your .env file.`);
    }
}

export const config = Object.freeze(_config);
