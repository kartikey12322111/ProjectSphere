import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from "./config/config.js";
import { errorMiddleware } from './middlewares/error.js';
import authRouter from "./router/userRoutes.js";
import adminRouter from "./router/adminRoutes.js";
import studentRouter from "./router/studentRoutes.js";
import notificationRouter from "./router/notificationRoutes.js";
import projectRouter from "./router/projectRoutes.js";
import deadlineRouter from "./router/deadlineRoutes.js";
import teacherRouter from "./router/teacherRoutes.js";
import chatRouter from "./router/chatRoutes.js";
import announcementRouter from "./router/announcementRoutes.js";
import searchRouter from "./router/searchRoutes.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Logging
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:3000",
  "https://projecttsphere.vercel.app",
  config.FRONTEND_URL
];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Handle preflight requests
app.options('*', cors());

// Ensure directories exist
const uploadsDir = path.join(__dirname, "uploads");
const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Middlewares
app.use("/uploads", express.static(uploadsDir));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/deadline", deadlineRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/announcements", announcementRouter);
app.use("/api/v1/search", searchRouter);

// Error Middleware (must be last)
app.use(errorMiddleware);

export default app;