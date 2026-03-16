import express from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  getNotifications,
  markAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", authenticate, getNotifications);
router.put("/:id/read", authenticate, markAsRead);

export default router;