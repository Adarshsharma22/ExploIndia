import express from "express";
import {sendMessage, getMessages, getConversations, } from "../controllers/messageController.js";
import { authenticate } from '../middlewares/auth.js';
import Message from "../models/Message.js";

const router = express.Router();

router.get("/conversations", authenticate, getConversations);
router.get("/:id", authenticate, getMessages);
router.post("/send", authenticate, sendMessage);


export default router;