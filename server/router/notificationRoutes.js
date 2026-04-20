import express from 'express'

import { isAuthenticated, isAuthorized } from '../middlewares/auth.js';
import { deleteNotification, getNotifications, markAllAsRead, markAsRead } from '../controllers/notificationController.js';



const router = express.Router();

router.get("/", isAuthenticated, getNotifications);
router.put("/:id/read", isAuthenticated, markAsRead);
router.put("/read-all", isAuthenticated, markAllAsRead);
router.delete("/:id/delete", isAuthenticated, deleteNotification);


export default router;
