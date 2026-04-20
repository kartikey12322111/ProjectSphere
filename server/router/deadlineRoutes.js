import express from 'express'

import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import { createDeadline } from '../controllers/deadlineController.js';
const router = express.Router();

router.post("/create-deadline/:id", isAuthenticated, isAuthorized("Admin", "Teacher"), createDeadline);



export default router;
