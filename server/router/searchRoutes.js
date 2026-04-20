import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { globalSearch } from "../controllers/searchController.js";

const router = express.Router();

router.get("/", isAuthenticated, globalSearch);

export default router;
