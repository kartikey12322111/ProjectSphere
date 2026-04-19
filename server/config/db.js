import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
    try {
        if (!config.MONGO_URI) {
            console.error("FATAL ERROR: MONGO_URI is not defined in config.");
            process.exit(1);
        }

        if (config.isDevelopment) {
            console.log(`Attempting to connect to MongoDB...`);
        }

        // Safety check for local DB in production
        if (config.isProduction && 
           (config.MONGO_URI.includes("127.0.0.1") || config.MONGO_URI.includes("localhost"))) {
            console.error("FATAL ERROR: Local MongoDB URI detected in production!");
            process.exit(1);
        }

        const connection = await mongoose.connect(config.MONGO_URI, {
            dbName: "projectsphere",
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`MongoDB Connected: ${connection.connection.host}`);
        
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); 
    }
};