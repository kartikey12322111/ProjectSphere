import { config } from "./config/config.js";
import { connectDB } from "./config/db.js";
import app from "./app.js";
import { initSocket } from "./socket.js";

const startServer = async () => {
    try {
        console.log("Starting server initialization...");
        console.log(`Node Environment: ${config.NODE_ENV}`);

        // Ensure DB is connected before starting the server
        await connectDB();
        console.log("DB connection established.");

        const server = app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });

        const io = initSocket(server);
        app.set("io", io); 
        console.log("Socket initialization complete.");

        // Graceful shutdown
        process.on("unhandledRejection", (err) => {
            console.error(`Unhandled Rejection: ${err.message}`);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error("CRITICAL ERROR during server startup:");
        console.error(error.stack || error.message || error);
        process.exit(1);
    }
};

startServer();

process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});